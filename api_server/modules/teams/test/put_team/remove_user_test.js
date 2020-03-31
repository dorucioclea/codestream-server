'use strict';

const PutTeamTest = require('./put_team_test');

class RemoveUserTest extends PutTeamTest {

	get description () {
		return 'should return the updated team and directive when removing a user from a team';
	}
   
	// form the data for the team update
	makeTeamData (callback) {
		// find one of the other users in the team, and remove them from the team
		super.makeTeamData(() => {
			this.removedUsers = this.getRemovedUsers();
			if (this.removedUsers.length === 1) {
				// this tests conversion of single element to an array
				const removedUser = this.removedUsers[0];
				this.data.$addToSet = { removedMemberIds: removedUser.id };
				this.expectedData.team.$addToSet = { 
					removedMemberIds: [removedUser.id]
				};
				this.expectedData.team.$pull = {
					adminIds: [removedUser.id]
				};
			}
			else {
				const removedUserIds = this.removedUsers.map(user => user.id);
				this.data.$addToSet = { removedMemberIds: removedUserIds };
				this.expectedData.team.$addToSet = {
					removedMemberIds: removedUserIds
				};
				this.expectedData.team.$pull = {
					adminIds: removedUserIds
				};
			}
			callback();
		});
	}

	// get the users we want to remove from the team
	getRemovedUsers () {
		return [this.users[2].user];
	}
}

module.exports = RemoveUserTest;
