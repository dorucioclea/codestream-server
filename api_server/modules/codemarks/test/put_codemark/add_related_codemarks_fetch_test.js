'use strict';

const AddRelatedCodemarksTest = require('./add_related_codemarks_test');
const BoundAsync = require(process.env.CSSVC_BACKEND_ROOT + '/shared/server_utils/bound_async');
const Assert = require('assert');
const CodemarkTestConstants = require('../codemark_test_constants');

class AddRelatedCodemarksFetchTest extends AddRelatedCodemarksTest {

	get description () {
		return 'should properly update a codemark when requested, including added related codemarks, checked by fetching the codemark';
	}

	get method () {
		return 'get';
	}

	getExpectedFields () {
		const fields = [...CodemarkTestConstants.EXPECTED_CODEMARK_FIELDS];
		fields.push('relatedCodemarkIds');
		return { codemark: fields };
	}

	// before the test runs...
	before (callback) {
		BoundAsync.series(this, [
			super.before,	// do the usual test prep
			this.updateCodemark	// perform the actual update
		], callback);
	}

	// validate that the response is correct
	validateResponse (data) {
		Assert(data.codemark.modifiedAt >= this.modifiedAfter, 'modifiedAt is not greater than before the codemark was updated');
		this.expectedCodemark.modifiedAt = data.codemark.modifiedAt;
		// verify what we fetch is what we got back in the response
		Assert.deepEqual(data.codemark, this.expectedCodemark, 'fetched codemark does not match');
	}
}

module.exports = AddRelatedCodemarksFetchTest;
