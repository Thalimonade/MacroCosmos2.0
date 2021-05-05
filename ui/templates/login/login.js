import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';


import './login.html';

Template.LoginSignUp.events({
    'click #LogIn'(event) {
		event.preventDefault();
		let nom = document.getElementById('eMail').value;
		let mdp = document.getElementById('pwd').value;
		Meteor.loginWithPassword(nom, mdp, (error) => {
			if (error) {
				alert(error.message);
			} else {
				setTimeout(() => FlowRouter.go('Ableu'), 200);
			}
		});
	},
	'click #SignUp'(event) {
		event.preventDefault();
		setTimeout(() => FlowRouter.go('signUpP'), 200);
	},
}) 


Template.LoginSignUp.events({
    'click #Suggest'(event) {
		
	},
})