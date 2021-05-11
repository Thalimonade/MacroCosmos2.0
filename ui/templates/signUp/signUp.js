import './signUp.html';

import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
//import { FlowRouter } from 'meteor/ostrio:flow-router-extra';


Template.signUpPage.events({
	/*'click #nouvelle_connexion'(event, template) {
		event.preventDefault();
		console.log(template);
		template.nouveau.get()
			? template.nouveau.set(false)
			: template.nouveau.set(true);
	},
	'click #connexion'(event) {
		event.preventDefault();
		let nom = document.getElementById('nom_utilisateur').value;
		let mdp = document.getElementById('mdp').value;
		Meteor.loginWithPassword(nom, mdp, (error) => {
			if (error) {
				alert(error.message);
			} else {
				setTimeout(() => FlowRouter.go('accueil'), 200);
			}
		});
	},*/
	'click #creer_compte'(event) {
		event.preventDefault();
		let firstName = document.getElementById('firstName').value;
        let lastName = document.getElementById('lastName').value;
        //let alias = document.getElementById('alias').value;
        let email = document.getElementById('email').value;
        let phone = document.getElementById('phone').value;
		let mdp = document.getElementById('mdp').value;
		let mdpConf = document.getElementById('mdpConf').value;
		let birthday = document.getElementById('birthday').value;
		 if (mdp.length > 5) {
			if (mdp == mdpConf) {
				if (firstName != '' && mdp != '' && email != '' && lastName != '' && phone != '') {
					Accounts.createUser(
						{
							username: email,
							password: mdp,
							profile: {
								firstName: firstName,
								lastName: lastName,
                                //alias: alias != '' ? alias : null,
                                phone: phone,
                                mdpConf: mdpConf,
                                birthday: birthday,
								plateformes: [0,0],
							},
						},
						(error) => {
							if (error) {
								alert(error.message);
							} else {
								setTimeout(() => FlowRouter.go('newProfil'), 200);
							}
						},
					);
				} else {
					alert('Veuillez renseigner les champs obligatioires');
				}
		  	} else {
				alert('Veuillez confirmer le mot de passe');
			}
		} else {
			alert('Mot de passe trop court');
		} 
	},
}); 