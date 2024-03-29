import './accueilSoiBlue.html';
import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Template } from 'meteor/templating'; 
import { Messages } from '../../../import/api/messages'; 
import { error } from 'jquery';

// ReactiveVars Blue
  // RVar profil, collab, carte, chat, feed
Template.accueilBleu.onCreated(function(){
  this.showProfil = new ReactiveVar( true );
  this.showNetwork = new ReactiveVar( false );
  this.showMap = new ReactiveVar( false );
  this.showChat = new ReactiveVar( false );
});



Template.accueilBleu.helpers({

  showNetwork: function() {
    return Template.instance().showNetwork.get();
  },

  showMap: function() {
    return Template.instance().showMap.get();
  },

  showChat: function() {
    return Template.instance().showChat.get();
  }
});

Template.accueilBleu.events({
  'change select': function( event, template ) {
    if ( $( event.target ).val() === "reseauPerso" ) {
      template.showNetwork.set( true );
    } else {
      template.showNetwork.set( false );
    }
    if ( $( event.target ).val() === "mapBlue" ) {
      template.showMap.set( true );
    } else {
      template.showMap.set( false );
    }
    if ( $( event.target ).val() === "chatBlue" ) {
      template.showChat.set( true );
    } else {
      template.showChat.set( false );
    }
  }
});

// chat
Template.Chat.helpers({
   messages() {
       return Messages.find();
   },
   getUsername(userId) {
    const user = Meteor.user().profile;
    if (user) return user.firstName
   }, 
   formatDate(date) {
      return date.toLocaleString()
   }
});

Template.Chat.events({
    'submit #chat-form'(event, instance) {
        event.preventDefault();
        const text = event.target.text.value;
        Meteor.call('messages.insert', text, (err) => {
          if (err) {
            alert(err.message);
        } else {
            event.target.reset();
        }
      })
    },
  });

// Carte accueil bleu
Meteor.startup(function() {
  GoogleMaps.load({key: 'AIzaSyBDLhhz9MZHAh3IFhIzU0cPunkBBDEzXXo'});
  });
  
  if (Meteor.isClient) {
  var MAP_ZOOM = 15;
  
  Meteor.startup(function() {
    GoogleMaps.load();
  });
  
  Template.blueMap.onCreated(function() {
    var self = this;
  
    GoogleMaps.ready('blueMap', function(map) {
      var marker;
  
      // Create and move the marker when latLng changes.
      self.autorun(function() {
        var latLng = Geolocation.latLng();
        if (! latLng)
          return;
  
        // If the marker doesn't yet exist, create it.
        if (! marker) {
          marker = new google.maps.Marker({
            position: new google.maps.LatLng(latLng.lat, latLng.lng),
            map: map.instance
          });
        }
        // The marker already exists, so we'll just change its position.
        else {
          marker.setPosition(latLng);
        }
  
        // Center and zoom the map view onto the current position.
        map.instance.setCenter(marker.getPosition());
        map.instance.setZoom(MAP_ZOOM);
      });
    });
  });
  
  Template.blueMap.helpers({
    geolocationError: function() {
      var error = Geolocation.error();
      return error && error.message;
    },
    mapOptions: function() {
      var latLng = Geolocation.latLng();
      // Initialize the map once we have the latLng.
      if (GoogleMaps.loaded() && latLng) {
        return {
          center: new google.maps.LatLng(latLng.lat, latLng.lng),
          zoom: MAP_ZOOM
        };
      }
    }
  });
// Ajouter les markers des utilisateurs avec on est en lien sur cette carte
}

  Template.profilPersoContact.helpers({
    
    //template.coUser.set(Meteor.user().profile),
    getPhoto: function() {
    let user = Meteor.user().profile;
      if (user) return user.picture
      else return "none"
    },
    getName: function() {
     let user = Meteor.user().profile; 
     if (user) return user.firstName
    }, 
    getLastName: function() {
      let user = Meteor.user().profile;
      if (user) return user.lastName
     }, 
    getPronouns: function() {
      let user = Meteor.user().profile;
      let PP = `Would like to be adressed as ${user.PrefPronouns}`;
      if (user) return PP                             
	  },
    getNickname: function() {
      let user = Meteor.user().profile;
      let NN = `Also known as ${user.Nickname}`;
      if (user) {
        return NN
      } 
     },     
    getBday: function() {
    let user = Meteor.user().profile;
    let BD = `Born on ${user.birthday}`;
    if (user) {
      return BD
     }                             
  },
    getLiens: function() {
    let user = Meteor.user().profile;
    var ptf = document.getElementById("ptf");
    let linktab = [];
    if (user) {
      for (let i = 0; i < user.plateformes.length; i++) {
        let element = user.plateformes[i];
        //let Phref = `<br>` + `<a href=${element[1]}>${element[0]}</a>`;
        
        //linktab.push(Phref);
        //ptf.innerHTML = `Find ${Meteor.user().profile.firstName} on: <br> `+ linktab;
       // return `Find ${Meteor.user().profile.firstName} on: <br> `+ linktab;
       }
     }                             
  },
  getExp: function() {
    let user = Meteor.user().profile;
    console.log(user);
    //let user = Meteor.user().profile.experiences;
    var expCv = document.getElementById("expCv");
    let exptab = [];
    if (user) {
      for (let i = 0; i < user.experiences.length; i++) {
        let element = user.experiences[i];
        let explist = `<br>` + `<b>${element[0]}</b> : ${element[1]}`;
        exptab.push(explist);
        //expCv.innerHTML = `${Meteor.user().profile.firstName}'s experiences<br>` + exptab + `<br>` ;
        return `${Meteor.user().profile.firstName}'s experiences<br>` + exptab + `<br>`;
       }
     }                             
  },
  getBio: function() {
    let user = Meteor.user().profile;
    let Abio = user.autoBio;
    if (user) {
      return Abio
     }                            
  },
});

Template.accueilBleu.helpers({
      getCollabs: function() {
        console.log(Meteor.user().profile.follows)
        return Meteor.user().profile.follows                         
    },
})















/* 1

import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import SimpleSchema from 'simpl-schema';

Messages = new Mongo.Collection("msgs");

Meteor.methods({
    sendMessage: function (message) {
      if (! Meteor.userId()) {
        throw new Meteor.Error("not-authorized");
      }
  
      Messages.insert({
        messageText: message,
        createdAt: new Date(),
        username: Meteor.user().firstName 
      });
    }
  });

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish("messages", function () {
    return Messages.find({}, {sort: {createdAt: -1}, limit: 5});
  });
}

/* scrolling code */

/* 2

if (Meteor.isClient) {
  // This code only runs on the client
  Meteor.subscribe("messages");
  Template.Chat.helpers({
    recentMessages: function () {
      return Messages.find({}, {sort: {createdAt: 1}});
    },
    /* unread message helper */

    /* 3
    
  }); 

  /*chat window scrolling*/

  /*4

  Template.Chat.events({
    "submit .new-message": function (event) {
      var text = event.target.text.value;

      Meteor.call("sendMessage", text);

      event.target.text.value = "";
      event.preventDefault();
    },

    /* scroll event */

    /* 5

  });

  /*account config*/

  /*6 
} */