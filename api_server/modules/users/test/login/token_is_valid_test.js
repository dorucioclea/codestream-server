'use strict';

const LoginTest = require('./login_test');
const Assert = require('assert');
const BoundAsync = require(process.env.CSSVC_BACKEND_ROOT + '/shared/server_utils/bound_async');

class TokenIsValidTest extends LoginTest {

	get description () {
		return 'access token returned with login should be valid for use';
	}

	// run the actual test...
	run (callback) {
		// run the main test, but then confirm we can use the access token
		BoundAsync.series(this, [
			super.run,
			this.getMe
		], callback);
	}

	getMe (callback) {
		this.doApiRequest(
			{
				method: 'get',
				path: '/users/me',
				token: this.response.accessToken
			},
			(error, response) => {
				if (error) { return callback(error); }
				Assert(response.user.id === this.response.user.id, '/me did not return same user');
				callback();
			}
		);
	}
}

module.exports = TokenIsValidTest;
