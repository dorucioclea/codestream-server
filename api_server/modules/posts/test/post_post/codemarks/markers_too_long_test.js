'use strict';

const CodemarkMarkerTest = require('./codemark_marker_test');
const DeepClone = require(process.env.CSSVC_BACKEND_ROOT + '/shared/server_utils/deep_clone');

class MarkersTooLongTest extends CodemarkMarkerTest {

	get description () {
		return 'should return an error when attempting to create a post and codemark with a markers array that is too long';
	}

	getExpectedError () {
		return {
			code: 'RAPI-1005',
			info: 'markers: array is too long'
		};
	}

	// form the data to use in trying to create the post
	makePostData (callback) {
		// create an array of markers that is over the limit in size, by duplicating the marker
		super.makePostData(() => {
			const marker = this.data.codemark.markers[0];
			for (let i = 0; i < 100; i++) {
				this.data.codemark.markers.push(DeepClone(marker));
			}
			callback();
		});
	}
}

module.exports = MarkersTooLongTest;
