// test constants for testing the teams module

'use strict';

const TeamAttributes = require(process.env.CSSVC_BACKEND_ROOT + '/api_server/modules/teams/team_attributes');
const CompanyAttributes = require(process.env.CSSVC_BACKEND_ROOT + '/api_server/modules/companies/company_attributes');
const StreamAttributes = require(process.env.CSSVC_BACKEND_ROOT + '/api_server/modules/streams/stream_attributes');

// fields expected in all teams
const EXPECTED_TEAM_FIELDS = [
	'id',
	'companyId',
	'name',
	'memberIds',
	'deactivated',
	'createdAt',
	'modifiedAt',
	'creatorId',
	'primaryReferral',
	'providerHosts'
];

// fields expected in the company returned
const EXPECTED_COMPANY_FIELDS = [
	'id',
	'deactivated',
	'createdAt',
	'modifiedAt',
	'creatorId',
	'name'
];

const EXPECTED_TEAM_RESPONSE = {
	team: EXPECTED_TEAM_FIELDS,
	company: EXPECTED_COMPANY_FIELDS
};

const UNSANITIZED_COMPANY_ATTRIBUTES = Object.keys(CompanyAttributes).filter(attribute => {
	return CompanyAttributes[attribute].serverOnly;
});

const UNSANITIZED_STREAM_ATTRIBUTES = Object.keys(StreamAttributes).filter(attribute => {
	return StreamAttributes[attribute].serverOnly;
});

const UNSANITIZED_ATTRIBUTES = Object.keys(TeamAttributes).filter(attribute => {
	return attribute !== 'providerHosts' && TeamAttributes[attribute].serverOnly;
});

module.exports = {
	EXPECTED_TEAM_RESPONSE,
	UNSANITIZED_ATTRIBUTES,
	UNSANITIZED_COMPANY_ATTRIBUTES,
	UNSANITIZED_STREAM_ATTRIBUTES
};
