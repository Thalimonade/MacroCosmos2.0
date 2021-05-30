import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import { Suggestions } from '../../../import/api/listesDB';

import './creaProfil.html';

/*Template.idUser.events({
    'click #profilPicture': function() {
        (async () => {
          const { value: post } = await Swal.fire({
            title: 'Set profil picture',
            input: 'file', 
            inputAttributes: {
              'accept': 'image/*',
              'aria-label': 'Upload your profile picture'
            }
          })
          
          if (post) {
            const reader = new FileReader()
            reader.onload = (e) => {
              Swal.fire({
                title: 'Your chosen picture',
                imageUrl: e.target.result,
                imageAlt: 'The uploaded picture',
                confirmButtonText: 'next',
              }).then((result) => {
                if (result.isConfirmed) {
                  Swal.fire({
                    title: 'Confirmation',
                    text: "Add this picture ?",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'yes'
                  }).then((result) => {
                    if (result.isConfirmed) {
                        let image = e.target.result;
                        // Appel de la méthode
                            Meteor.users.update({_id: Meteor.userId()},
                            {$set: {"profile.picture": Profil}})
                
                        //display confirmation message
                        Swal.fire(
                            'Added',
                            'Your post has been successfully added!',
                            'success',
                        );
                    }
                  })
                }
              })
            }
            reader.readAsDataURL(post)
          }
          
          })()
      },
})*/

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
})

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