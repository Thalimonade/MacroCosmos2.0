import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { Markers } from '../../../import/api/listesDB';


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

Meteor.startup(function() {
GoogleMaps.load({key: 'AIzaSyBDLhhz9MZHAh3IFhIzU0cPunkBBDEzXXo'});
});

if (Meteor.isClient) {
var MAP_ZOOM = 15;

  Meteor.startup(function() {
    GoogleMaps.load();
  });

  Template.map.onCreated(function() {
    var self = this;

    GoogleMaps.ready('map', function(map) {
      var marker;

      // Création du marker en fonction de lat et lng
      self.autorun(function() {
        var latLng = Geolocation.latLng();
        if (! latLng)
          return;

        // Si pas de marker, création
        if (! marker) {
          marker = new google.maps.Marker({
            position: new google.maps.LatLng(latLng.lat, latLng.lng),
            map: map.instance
          });
        }
        // Si marker, changement de position
        else {
          marker.setPosition(latLng);
        }

        // Zoom sur la position
        map.instance.setCenter(marker.getPosition());
        map.instance.setZoom(MAP_ZOOM);
      });
    });
  });
  
  // Demande d'activation geoloc du navigateur
  Template.map.helpers({
    geolocationError: function() {
      var error = Geolocation.error();
      return error && error.message;
    },

    mapOptions: function() {
      var latLng = Geolocation.latLng();
      // lancement de la carte ggl si on a info sur latlng
      if (GoogleMaps.loaded() && latLng) {
        return {
          center: new google.maps.LatLng(latLng.lat, latLng.lng),
          zoom: MAP_ZOOM
        };
      }
    }
  });
}


