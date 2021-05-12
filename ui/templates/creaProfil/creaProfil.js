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

var tab = [];
var tabCv = [];

Template.liensExt.events({
    'click #submitLiens'(event) {
     event.preventDefault();
	var plateforme = document.getElementById('plateforme').value;
    var Liens = document.getElementById('liens').value;
    
    Meteor.users.update({_id: Meteor.userId()}, 
    {$push: {"profile.plateformes": [plateforme, Liens]}});
    
    var x = document.getElementById("liensDonnés");       
    var link =  `<br>` + " your " + `<a href="${Liens}">${plateforme}</a>`;
    tab.push(link);
    x.innerHTML = "Now, we've got " + tab;                                
	},
});

Template.CVart.events({
    'click #submitExp'(event) {
     event.preventDefault();
	let exp = document.getElementById('experienceTitle1').value;
    let details = document.getElementById('details').value;
    Meteor.users.update({_id: Meteor.userId()}, 
    {$push: {"profile.experiences": [exp, details]}})
    
    var y = document.getElementById("expDonnées");       
    var expe =  `<br>` + exp;
    tabCv.push(expe);
    y.innerHTML = "You've done " + tabCv;
	},
})

Template.NotesAuto.events({
    'click #submitBio'(event) {
     event.preventDefault();
	let autoBio = document.getElementById('autoBio').value;
    Meteor.users.update({_id: Meteor.userId()}, 
    {$set: {"profile.autoBio": autoBio}})
	},
});

Template.listCategoriesCoches.events({
    'click #joinCat'(event) {
     event.preventDefault();
    let checkboxes = document.querySelectorAll(`input[name="Cats"]:checked`);
    let Cats = [];
    checkboxes.forEach((checkbox) => {
        Cats.push(checkbox.value);
    });
    Meteor.users.update({_id: Meteor.userId()}, 
    {$set: {"profile.categories": Cats}})
    console.log(Cats);
    return Cats;
    },
})

Template.BoutonP.events({
    'click #preview'(event) {
        setTimeout(() => FlowRouter.go('Ableu'), 200);
    },
})

Template.BoutonC.events({
    'click #create'(event) {
        setTimeout(() => FlowRouter.go('Ableu'), 200);
    },
})