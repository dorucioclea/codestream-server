// base class for many tests of the "GET /no-auth/unfollow-link/:id" requests

'use strict';

const BoundAsync = require(process.env.CSSVC_BACKEND_ROOT + '/shared/server_utils/bound_async');
const CodeStreamAPITest = require(process.env.CSSVC_BACKEND_ROOT + '/api_server/lib/test_base/codestream_api_test');
const DeepClone = require(process.env.CSSVC_BACKEND_ROOT + '/shared/server_utils/deep_clone');
const TokenHandler = require(process.env.CSSVC_BACKEND_ROOT + '/shared/server_utils/token_handler');

class CommonInit {

	init (callback) {
		this.teamOptions.creatorIndex = 1;
		this.streamOptions.creatorIndex = 1;
		this.streamOptions.type = this.streamType || 'channel';
		this.streamOptions.isTeamStream = this.isTeamStream || false;
		Object.assign(this.postOptions, {
			numPosts: 1,
			creatorIndex: 1,
			wantCodemark: true,
			wantMarker: true
		});

		BoundAsync.series(this, [
			CodeStreamAPITest.prototype.before.bind(this),
			this.followCodemark,	// first follow the codemark
			this.makeTestData		// make the data to use when issuing the test request
		], callback);
	}

	// follow the codemark so we can unfollow in the test
	followCodemark (callback) {
		this.codemark = this.postData[0].codemark;
		if (this.skipFollow) { return callback(); }
		this.doApiRequest(
			{
				method: 'put',
				path: `/codemarks/follow/${this.codemark.id}`,
				token: this.currentUser.accessToken
			},
			callback
		);
	}

	// make the data to use when issuing the test request
	makeTestData (callback) {
		const expectedVersion = this.streamType === 'direct' ? 2 : 3;
		const expiresIn = this.expiresIn || 3 * 30 * 24 * 60 * 60 * 1000; // three months
		const expiresAt = Date.now() + expiresIn;
		this.token = new TokenHandler(this.apiConfig.sharedSecrets.auth).generate(
			{
				uid: this.tokenUserId || this.currentUser.user.id
			},
			this.tokenType || 'unf',
			{
				expiresAt
			}
		);


		this.message = {
			codemark: {
				_id: this.codemark.id,	// DEPRECATE ME
				id: this.codemark.id,
				$set: {
					version: expectedVersion,
					modifiedAt: Date.now() // placeholder
				},
				$pull: {
					followerIds: this.currentUser.user.id
				},
				$version: {
					before: expectedVersion - 1,
					after: expectedVersion
				}
			}
		};

		this.modifiedAfter = Date.now();
		this.path = `/no-auth/unfollow-link/${this.codemark.id}?t=${this.token}`;
		this.expectedCodemark = DeepClone(this.codemark);
		Object.assign(this.expectedCodemark, this.message.codemark.$set);
		this.expectedCodemark.followerIds = [this.users[1].user.id];
		callback();
	}

	// perform the actual unfollow
	unfollowCodemark (callback) {
		this.doApiRequest(
			{
				method: 'get',
				path: this.path,
				requestOptions: {
					noJsonInResponse: true,
					expectRedirect: true
				}
			},
			callback
		);
	}
}

module.exports = CommonInit;
