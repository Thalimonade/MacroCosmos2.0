import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';

import './creaProfil.html';


Template.idUser.events({
    'click #submitId'(event) {
     event.preventDefault();
	let Nickname = document.getElementById('Nickname').value;
	//let photo = document.getElementById('myfile').value;
    let pronouns = document.getElementById('PrefPronouns').value;
    Meteor.users.update({_id: Meteor.userId()}, 
    {$set: {"profile.PrefPronouns": pronouns}})

    Meteor.users.update({_id: Meteor.userId()},
    {$set: {"profile.Nickname": Nickname}});			
	},
})

Template.liensExt.events({
    'click #submitId'(event) {
     event.preventDefault();
	let Nickname = document.getElementById('Nickname').value;
	//let photo = document.getElementById('myfile').value;
    let pronouns = document.getElementById('PrefPronouns').value;
    Meteor.users.update({_id: Meteor.userId()}, 
    {$set: {"profile.PrefPronouns": pronouns}})

    Meteor.users.update({_id: Meteor.userId()},
    {$set: {"profile.Nickname": Nickname}});			
	},
})