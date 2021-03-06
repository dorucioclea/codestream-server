'use strict';

const ReviewTest = require('./review_test');
const BoundAsync = require(process.env.CSSVC_BACKEND_ROOT + '/shared/server_utils/bound_async');
const Assert = require('assert');

class FollowingReviewFromReplyTest extends ReviewTest {

	get description () {
		return 'when a review is created and another user replies, the replying user should be added as a follower';
	}

	setTestOptions (callback) {
		super.setTestOptions(() => {
			this.repoOptions.creatorIndex = 1;
			Object.assign(this.postOptions, {
				creatorIndex: 1,
				numPosts: 1,
				wantReview: true,
				wantMarkers: 2,
				numChanges: 2
			});
			callback();
		});
	}

	// form the data for the post we'll create in the test
	makePostData (callback) {
		super.makePostData(() => {
			// test is not really to create the review, but to create the reply and then
			// test that the parent review gets the user added to its array of followers,
			// so we'll remove the review in the request data here, and instead make it 
			// a regular post as a reply
			delete this.data.review;
			this.data.parentPostId = this.postData[0].post.id;
			callback();
		});
	}

	// run the test...
	run (callback) {
		BoundAsync.series(this, [
			super.run,	// this posts the reply and checks the result, but then...
			this.checkParentPost	// ...we'll check the parent review as well
		], callback);
	}

	validateResponse () {
		// ignore validation of the normal test
	}

	// check the parent review for correct array of followers
	checkParentPost (callback) {
		this.doApiRequest(
			{
				method: 'get',
				path: '/reviews/' + this.postData[0].review.id,
				token: this.token
			},
			(error, response) => {
				if (error) { return callback(error); }
				Assert.deepEqual(response.review.followerIds, [this.users[1].user.id, this.currentUser.user.id]);
				callback();
			}
		);
	}
}

module.exports = FollowingReviewFromReplyTest;
