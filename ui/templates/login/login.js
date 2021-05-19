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
  Template.map.onCreated(function() {
    Meteor.subscribe('markers')
    GoogleMaps.ready('map', function(map) {
      google.maps.event.addListener(map.instance, 'click', function(event) {
        Meteor.call('markers.insert', event.latLng.lat(), event.latLng.lng())
      });

      var markers = {};

      Markers.find().observe({
        added: function (document) {
          var marker = new google.maps.Marker({
            draggable: true,
            animation: google.maps.Animation.DROP,
            position: new google.maps.LatLng(document.lat, document.lng),
            map: map.instance,
            id: document._id
          });

          google.maps.event.addListener(marker, 'dragend', function(event) {
            Markers.update(marker.id, { $set: { lat: event.latLng.lat(), lng: event.latLng.lng() }});
          });

          markers[document._id] = marker;
        },
        changed: function (newDocument, oldDocument) {
          markers[newDocument._id].setPosition({ lat: newDocument.lat, lng: newDocument.lng });
        },
        removed: function (oldDocument) {
          markers[oldDocument._id].setMap(null);
          google.maps.event.clearInstanceListeners(markers[oldDocument._id]);
          delete markers[oldDocument._id];
        }
      });
    });
  });

  Meteor.startup(function() {
    GoogleMaps.load();
  });

  Template.map.helpers({
    mapOptions: function() {
      if (GoogleMaps.loaded()) {
        return {
          center: new google.maps.LatLng(46.516,  6.63282),
          zoom: 8
        };
      }
    }
  });
}
