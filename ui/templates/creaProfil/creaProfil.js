import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import { Suggestions } from '../../../import/api/listesDB';

import './creaProfil.html';

const Swal = require('sweetalert2');

Template.idUser.events({
    'click #submitId'(event) {
     event.preventDefault();
	let Nickname = document.getElementById('Nickname').value;
	//let picture = document.getElementById('myfile').value;
    let pronouns = document.getElementById('PrefPronouns').value;
    Meteor.users.update({_id: Meteor.userId()}, 
    {$set: {"profile.PrefPronouns": pronouns}});

   // Meteor.users.update({_id: Meteor.userId()},
    //{$set: {"profile.picture": picture}});	
    //CMT FAIRE POUR PRENDRE UN PHOTO?

    Meteor.users.update({_id: Meteor.userId()},
    {$set: {"profile.Nickname": Nickname}});			
	},
});

Template.idUser.events({
    'click #submitId': function() {
            Swal.fire({
                title: 'Confirmation',
                text: "Got you!",
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'k m8'
            })
        }
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

Template.liensExt.events({
    'click #submitLiens': function() {
            Swal.fire({
                title: 'Confirmation',
                text: "Got you!",
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'k m8'
            })
        }
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

Template.CVart.events({
    'click #submitExp': function() {
            Swal.fire({
                title: 'Confirmation',
                text: "Got you!",
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'k m8'
            })
        }
});

Template.NotesAuto.events({
    'click #submitBio'(event) {
     event.preventDefault();
	let autoBio = document.getElementById('autoBio').value;
    Meteor.users.update({_id: Meteor.userId()}, 
    {$set: {"profile.autoBio": autoBio}})
	},
});

Template.NotesAuto.events({
    'click #submitBio': function() {
            Swal.fire({
                title: 'Confirmation',
                text: "Got you!",
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'k m8'
            })
        }
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
    'click #Suggest'(event) {
    event.preventDefault();
    let newCat = document.getElementById("newCat").value;
    console.log(newCat);
    /*Meteor.call('sugg.insert', newCat, (err) => {
        if (err) {
            alert(err.message);
        } else {
            event.target.reset();
        }
    })*/
    Meteor.call('Suggérer', newCat);
    }
});

Template.listCategoriesCoches.events({
    'click #Suggest': function() {
            Swal.fire({
                title: 'Confirmation',
                text: "Message received! We'll let you know",
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'thanks!'
            })
        }
});

Template.BoutonP.events({
    'click #preview'(event) {
        setTimeout(() => FlowRouter.go('Ableu'), 200);
    },
})

Template.BoutonC.events({
    'click #create'(event) {
        setTimeout(() => FlowRouter.go('accueils2x'), 200);
    },
})