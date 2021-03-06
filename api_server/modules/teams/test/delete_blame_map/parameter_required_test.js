'use strict';

const DeleteBlameMapTest = require('./delete_blame_map_test');

class ParameterRequiredTest extends DeleteBlameMapTest {

	get description () {
		return `should return an error when attempting to remove a blame-map entry without providing ${this.parameter}`;
	}

	getExpectedError () {
		return {
			code: 'RAPI-1001',
			info: this.parameter
		};
	}

	// before the test runs...
	before (callback) {
		// run the standard test set up for adding the blame-map, but...
		super.before(error => {
			if (error) { return callback(error); }
			// ...delete the parameter of interest
			delete this.data[this.parameter];
			callback();
		});
	}
}

module.exports = ParameterRequiredTest;
