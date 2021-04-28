import './body.html';
import '../login/login.js';
import '../signUp/signUp.js';
import '../accueils/accueilSoiBlue.js';
import '../accueils/accueilNvxRouge.js';
import '../creaProfil/creaProfil.js'; 
import '../../../lib/routing.js';

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
})