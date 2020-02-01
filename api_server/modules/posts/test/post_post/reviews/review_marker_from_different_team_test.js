'use strict';

const ReviewMarkersTest = require('./review_markers_test');
const BoundAsync = require(process.env.CS_API_TOP + '/server_utils/bound_async');
const TestTeamCreator = require(process.env.CS_API_TOP + '/lib/test_base/test_team_creator');

class ReviewMarkerFromDifferentTeamTest extends ReviewMarkersTest {

	get description () {
		return 'should return an error when attempting to create a post and review with a marker element where the stream is from a different team';
	}

	getExpectedError () {
		return {
			code: 'RAPI-1011',
			reason: 'marker stream must be from the same team'
		};
	}

	before (callback) {
		BoundAsync.series(this, [
			super.before,
			this.createForeignTeam,
			this.createOtherStream
		], callback);
	}

	createForeignTeam (callback) {
		new TestTeamCreator({
			test: this,
			teamOptions: Object.assign({}, this.teamOptions, {
				creatorIndex: null,
				creatorToken: this.users[1].accessToken,
				members: [this.currentUser.user.email],
				numAdditionalInvites: 0
			}),
			userOptions: this.userOptions,
			repoOptions: { 
				creatorToken: this.users[1].accessToken
			}
		}).create((error, response) => {
			if (error) { return callback(error); }
			this.foreignTeam = response.team;
			this.foreignRepo = response.repo;
			callback();
		});
	}

	createOtherStream (callback) {
		this.streamFactory.createRandomStream(
			(error, response) => {
				if (error) return callback(error);
				this.data.review.markers[0].fileStreamId = response.stream.id;
				callback();
			},
			{
				teamId: this.foreignTeam.id,
				repoId: this.foreignRepo.id,
				type: 'file',
				token: this.users[1].accessToken
			}
		);
	}
}

module.exports = ReviewMarkerFromDifferentTeamTest;
