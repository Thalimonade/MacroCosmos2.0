import './body.html';
import '../login/login.js';
import '../signUp/signUp.js';
import '../accueils/accueilSoiBlue.js';
import '../accueils/accueilNvxRouge.js';
import '../creaProfil/creaProfil.js'; 
import '../../../lib/routing.js';
import '../accueils/accueils2x.js';
import '../preferences/preferences.js';
import '../elements_feed/elements_feed.js'

import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';


Template.app_body.events({
    'click #logIn'(event) {
        event.preventDefault();
        FlowRouter.go('log')
    },
    'click #signUp'(event) {
        event.preventDefault();
        FlowRouter.go('signUpP');
    },
    'click #newProfil'(event) {
        event.preventDefault();
        FlowRouter.go('newProfil')
    },
    'click #accRouge'(event) {
        event.preventDefault();
        FlowRouter.go('Arouge')
    },
    'click #accBleu'(event) {
        event.preventDefault();
        FlowRouter.go('Ableu')
    },
    'click #accueils2x'(event) {
        event.preventDefault();
        FlowRouter.go('accueils2x')
    },
    'click #Logout'(event) {
		event.preventDefault();
		Meteor.logout();
        setTimeout(() => FlowRouter.go('log'), 200);
	},
    'click #préf'(event) {
		setTimeout(() => FlowRouter.go('preferences'), 200);
	},
})