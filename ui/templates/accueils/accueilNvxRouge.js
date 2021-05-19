import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

import './accueilNvxRouge.html';


Template.logoutRéglages.events({
    'click #logout'(event) {
		event.preventDefault();
		Meteor.logout();
        setTimeout(() => FlowRouter.go('log'), 200);
			},

	'click #boutonPref'(event) {
		setTimeout(() => FlowRouter.go('preferences'), 200);
			}
		});


