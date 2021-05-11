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
});

Template.liensExt.events({
    'click #submitLiens'(event) {
     event.preventDefault();
	var plateforme = document.getElementById('plateforme').value;
    var Liens = document.getElementById('liens').value;
    
    Meteor.users.update({_id: Meteor.userId()}, 
    {$addToSet: {"profile.plateformes": plateforme}});

    Meteor.users.update({_id: Meteor.userId()},
    {$addToSet: {"profile.plateformes": Liens}});	
    
    var x = document.querySelector("p");  
    var liste = document.createElement("LI");                    
    var t = document.createTextNode("Your " + <a href={Liens}>plateforme</a> );    
    liste.appendChild(t);    
    x.appendChild(liste);                              
	},
});

Template.CVart.events({
    'click #submitExp'(event) {
     event.preventDefault();
	let exp = document.getElementById('experienceTitle1').value;
    let details = document.getElementById('details').value;
    Meteor.users.update({_id: Meteor.userId()}, 
    {$set: {"profile.experience1": exp}})

    Meteor.users.update({_id: Meteor.userId()},
    {$set: {"profile.details1": details}});			
	},
});

Template.NotesAuto.events({
    'click #submitBio'(event) {
     event.preventDefault();
	let autoBio = document.getElementById('autoBio').value;
    Meteor.users.update({_id: Meteor.userId()}, 
    {$set: {"profile.autoBio": autoBio}})
	
	},
});