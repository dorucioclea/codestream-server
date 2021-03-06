'use strict';

const Restful = require(process.env.CSSVC_BACKEND_ROOT + '/api_server/lib/util/restful/restful');
const CompanyCreator = require('./company_creator');
//const CompanyUpdater = require('./company_updater');
const Company = require('./company');

// we'll expose only these routes
const COMPANY_STANDARD_ROUTES = {
	want: ['get', 'getMany', 'post'],
	baseRouteName: 'companies',
	requestClasses: {
		'get': require('./get_company_request'),
		'getMany': require('./get_companies_request'),
		'post': require('./post_company_request')
	}
};

class Companies extends Restful {

	get collectionName () {
		return 'companies';	// name of the data collection
	}

	get modelName () {
		return 'company'; // name of the data model
	}

	get modelDescription () {
		return 'A single company, owning one or more teams';
	}

	get creatorClass () {
		return CompanyCreator; // derived from ModelCreator, class to use to create a company model
	}

	get modelClass () {
		return Company;	// derived from DataModel, class to use for a company model
	}

	/*
	get updaterClass () {
		return CompanyUpdater;
	}
*/

	getRoutes () {
		// routes the module will expose
		return super.getRoutes(COMPANY_STANDARD_ROUTES);
	}
}

module.exports = Companies;
