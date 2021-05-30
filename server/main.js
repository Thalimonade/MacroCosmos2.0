import { Meteor } from 'meteor/meteor';
import { Messages } from '../import/api/messages'; 
import "../import/api/listesDB.js";
import { Accounts } from 'meteor/accounts-base';

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.publish('profileInfo', function (username) {
  return Meteor.users.find({username},{
    fields: { 
    firstName: 1,
    lastName: 1,
    Nickname: 1,
    username: 1,
    prefPronouns: 1,
    birthday: 1,
    plateformes: 1,
    categories: 1,
    experiences: 1
  }
  });
  });