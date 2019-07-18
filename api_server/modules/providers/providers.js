// provide a module to handle requests associated with third-party providers

'use strict';

const qs = require('querystring');
const APIServerModule = require(process.env.CS_API_TOP +
	'/lib/api_server/api_server_module.js');
const ErrorHandler = require(process.env.CS_API_TOP +
	'/server_utils/error_handler');
const Errors = require('./errors');
const RestfulErrors = require(process.env.CS_API_TOP +
	'/lib/util/restful/errors');
const AuthErrors = require(process.env.CS_API_TOP +
	'/modules/authenticator/errors');
const UserErrors = require(process.env.CS_API_TOP + '/modules/users/errors');
const MSTeamsConversationBot = require('./msteams_conversation_bot');

const ROUTES = [
	{
		method: 'put',
		path: '/no-auth/provider-connect/:provider',
		requestClass: require('./provider_connect_request')
	},
	{
		method: 'get',
		path: '/no-auth/provider-auth/:provider',
		requestClass: require('./provider_auth_request')
	},
	{
		method: 'get',
		path: '/no-auth/provider-token/:provider',
		requestClass: require('./provider_token_request')
	},
	{
		method: 'get',
		path: '/provider-auth-code',
		requestClass: require('./provider_authcode_request')
	},
	{
		method: 'put',
		path: '/provider-deauth/:provider',
		requestClass: require('./provider_deauth_request')
	},
	{
		method: 'get',
		path: '/provider-refresh/:provider',
		requestClass: require('./provider_refresh_request')
	},
	{
		method: 'put',
		path: '/provider-set-token/:provider',
		requestClass: require('./provider_set_token_request')
	},
	{
		method: 'put',
		path: '/provider-info/:provider',
		requestClass: require('./provider_info_request')
	},
	{
		method: 'put',
		path: 'provider-host/:provider/:teamId',
		requestClass: require('./provider_host_request')
	},
	{
		method: 'delete',
		path: 'provider-host/:provider/:teamId/:providerId',
		requestClass: require('./delete_provider_host_request')
	},
	{
		method: 'post',
		path: '/no-auth/provider-action/:provider',
		requestClass: require('./provider_action_request')
	}
];

class Providers extends APIServerModule {
	constructor (options) {
		super(options);
		this.errorHandler = new ErrorHandler(Errors);
		this.errorHandler.add(RestfulErrors);
		this.errorHandler.add(UserErrors);
		this.errorHandler.add(AuthErrors);
	}

	getRoutes () {
		return ROUTES;
	}

	middlewares () {
		return (request, response, next) => {

			// HACK: the provider-action request (coming from slack) is form data with a value that is
			// encoded JSON data ... monumentally stupid
			const match = request.path.match(
				/^\/no-auth\/provider-action\/(.+)/
			);
			if (!match) {
				return next();
			}

			if (match[1] === 'msteams') {	
				// msteams can bypass all the madness below
				return next();
			}

			if (this.api.config.api.mockMode) {
				if (!request.body.payload) {
					request.body = {};
					return next();
				}
				let jsonPayload;
				try {
					jsonPayload = JSON.parse(decodeURIComponent(request.body.payload));
				}
				catch (ex) {
					return response.status(404).send('Not Found');
				}
				request.body = {
					payload: jsonPayload,
					payloadRaw: `payload=${request.body.payload}`
				};
				return next();
			}

			let data = '';
			request.on('data', chunk => {
				data += chunk;
			});
			request.on('end', () => {
				if (match[1] === 'slack') {
					if (data.indexOf('payload=') === 0) {
						let jsonPayload;
						try {
							// sadly, we have to parse the payload before verifying as we 
							// need the appId
							jsonPayload = JSON.parse(qs.parse(data).payload);
						}
						catch (ex) {
							return response.status(404).send('Not Found');
						}
						request.body = {
							payload: jsonPayload,
							payloadRaw: data
						};
					}
				} else {
					try {
						request.body = JSON.parse(data);
					} catch (error) {
						request.body = {};
					}
				}
				next();
			});
		};
	}

	initialize () {
		MSTeamsConversationBot.initialize({
			publicApiUrl: this.api.config.api.publicApiUrl
		});		 
	}

	// describe any errors associated with this module, for help
	describeErrors () {
		return {
			Provider: Errors
		};
	}
}

module.exports = Providers;