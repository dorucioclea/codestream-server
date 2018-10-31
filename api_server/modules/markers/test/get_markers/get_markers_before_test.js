'use strict';

const GetMarkersTest = require('./get_markers_test');

class GetMarkersBeforeTest extends GetMarkersTest {

	get description () {
		return 'should return the correct markers when requesting markers in a stream before a timestamp';
	}

	// set the path to use for the request
	setPath (callback) {
		// pick a pivot point, then filter our expected posts based on that pivot,
		// and specify the before parameter to fetch based on the pivot
		const pivot = this.markers[2].createdAt;
		this.expectedMarkers = this.markers.filter(marker => marker.createdAt < pivot);
		this.path = `/markers/?teamId=${this.team._id}&streamId=${this.repoStreams[0]._id}&before=${pivot}`;
		callback();
	}
}

module.exports = GetMarkersBeforeTest;
