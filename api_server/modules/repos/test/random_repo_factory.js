// provide a factory for creating random repos, for testing purposes

'use strict';

const RandomString = require('randomstring');

class RandomRepoFactory {

	constructor (options) {
		Object.assign(this, options);
	}

	// create the repo by submitting a request to the server
	createRepo (data, token, callback) {
		this.apiRequester.doApiRequest({
			method: 'post',
			path: '/repos',
			data: data,
			token: token
		}, callback);
	}

	// generate a random url, kind of like a github url but more random
	randomUrl (options = {}) {
		const domain = options.domain || `${RandomString.generate(6)}.${RandomString.generate(6)}.com`;
		const org = options.org || RandomString.generate(8);
		return `https://user@${domain}/${org}/${RandomString.generate(4)}?x=1&y=2#xyz`;
	}

	// generate a random commit hash, doesn't really look like the real thing but should be good enough
	randomCommitHash () {
		return RandomString.generate(40);
	}

	// get some random attributes to create a random repo
	getRandomRepoData (callback, options = {}) {
		let data = {
			url: this.randomUrl(options),
			knownCommitHashes: [this.randomCommitHash()]
		};
		if (options.numKnownCommitHashes && options.numKnownCommitHashes > 1) {
			for (let i = 1; i < options.numKnownCommitHashes; i++) {
				data.knownCommitHashes.push(this.randomCommitHash());
			}
		}
		let emails, users;
		if (options.withEmails) {
			// add some emails, these become on-the-fly users who are added to the team along with the repo
			emails = options.withEmails;
		}
		if (options.withRandomEmails) {
			// generate some random emails, these become on-the-fly unregistered users who are added to the team along with the repo
			emails = (emails || []).concat(
				this.getNRandomEmails(options.withRandomEmails)
			);
		}
		if (options.withUsers) {
			// add some actual pre-existing users, providing more than just emails
			users = options.withUsers;
		}
		if (options.withRandomUsers) {
			// generate some random users with preset attributes
			users = (users || []).concat(
				this.getNRandomUsers(options.withRandomUsers)
			);
		}
		if (options.subscriptionCheat) {
			// allows unregistered users to subscribe to me-channel, needed for mock email testing
			data._subscriptionCheat = this.apiConfig.sharedSecrets.subscriptionCheat;
		}
		if (options.teamId) {
			// add the repo to a pre-existing team
			data.teamId = options.teamId;
			if (emails) {
				data.emails = emails;
			}
			if (users) {
				data.users = users;
			}
		}
		else if (options.team) {
			// create a team on-the-fly, according to specification
			data.team = options.team;
		}
		else {
			// create a random team on the fly
			data.team = {
				name: this.teamFactory.randomName()
			};
			if (emails) {
				data.team.emails = emails;
			}
			if (users) {
				data.team.users = users;
			}
		}
		return callback(null, data);
	}

	// get several random emails
	getNRandomEmails (n) {
		let emails = [];
		for (let i = 0; i < n; i++) {
			emails.push(this.userFactory.randomEmail());
		}
		return emails;
	}

	// get several random sets of user attributes, including email, first and last name
	getNRandomUsers (n) {
		let users = [];
		for (let i = 0; i < n; i++) {
			users.push({
				email: this.userFactory.randomEmail(),
				fullName: this.userFactory.randomFullName()
			});
		}
	}

	// create a random repo in the database
	createRandomRepo (callback, options = {}) {
		this.getRandomRepoData(
			(error, data) => {
				if (error) { return callback(error); }
				this.createRepo(data, options.token, callback);
			},
			options
		);
	}
}

module.exports = RandomRepoFactory;
