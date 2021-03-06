// base class for many tests of the "POST /codemarks" requests

'use strict';

const Aggregation = require(process.env.CSSVC_BACKEND_ROOT + '/shared/server_utils/aggregation');
const CodeStreamAPITest = require(process.env.CSSVC_BACKEND_ROOT + '/api_server/lib/test_base/codestream_api_test');
const CodemarkTestConstants = require('../codemark_test_constants');
const CommonInit = require('./common_init');
const CodemarkValidator = require('../codemark_validator');

class PostCodemarkTest extends Aggregation(CodeStreamAPITest, CommonInit) {

	constructor (options) {
		super(options);
		this.expectProviderType = true;
	}

	get description () {
		return 'should return a valid codemark when creating an codemark tied to a third-party post';
	}

	get method () {
		return 'post';
	}

	get path () {
		return '/codemarks';
	}

	getExpectedFields () {
		let expectedFields;
		if (this.codemarkType === 'link') {
			expectedFields = CodemarkTestConstants.EXPECTED_INVISIBLE_CODEMARK_FIELDS;
		}
		else {
			expectedFields = CodemarkTestConstants.EXPECTED_CODEMARK_FIELDS;
		}
		return { codemark: expectedFields };
	}

	// before the test runs...
	before (callback) {
		this.init(callback);
	}

	/* eslint complexity: 0 */
	// validate the response to the test request
	validateResponse (data) {
		// verify we got back an codemark with the attributes we specified
		new CodemarkValidator({
			test: this,
			inputCodemark: this.data,
			expectedOrigin: this.expectedOrigin,
			expectedOriginDetail: this.expectedOriginDetail,
		}).validateCodemark(data);
	}
}

module.exports = PostCodemarkTest;
