'use strict';

const CodeStreamAPITest = require(process.env.CSSVC_BACKEND_ROOT + '/api_server/lib/test_base/codestream_api_test');
const CommonInit = require('./common_init');
const Aggregation = require(process.env.CSSVC_BACKEND_ROOT + '/shared/server_utils/aggregation');
const Assert = require('assert');

class UnreadTest extends Aggregation(CodeStreamAPITest, CommonInit) {

	get description () {
		return 'should set lastReads for the stream of a post when post is marked as unread';
	}

	get method () { 
		return 'put';
	}
	
	// before the test runs...
	before (callback) {
		this.init(error => {
			if (error) { return callback(error); }
			const unreadPost = this.postData[this.unreadPost].post;
			this.path = '/unread/' + unreadPost.id;
			this.updatedAt = Date.now();
			callback();
		});
	}

	validateResponse (data) {
		Assert(data.user.$set.modifiedAt >= this.updatedAt, 'modifiedAt not changed');
		this.expectedData.user.$set.modifiedAt = data.user.$set.modifiedAt;
		Assert.deepEqual(data, this.expectedData, 'response not correct');
	}
}

module.exports = UnreadTest;
