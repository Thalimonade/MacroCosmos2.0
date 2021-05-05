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

Meteor.startup(function() {
	GoogleMaps.load();
  });
  
Template.map.helpers({
	mapOptions: function() {
	  if (GoogleMaps.loaded()) {
		return {
		  center: new google.maps.LatLng(-37.8136, 144.9631),
		  zoom: 8
		};
	  }
	}
  });

Template.map.onCreated(function() {
	GoogleMaps.ready('map', function(map) {
	  google.maps.event.addListener(map.instance, 'click', function(event) {
		Markers.insert({ lat: event.latLng.lat(), lng: event.latLng.lng() });
	  });
	  
	  var markers = {};

	  Markers.find().observe({
		added: function(document) {
		  // Create a marker for this document
		  var marker = new google.maps.Marker({
			draggable: true,
			animation: google.maps.Animation.DROP,
			position: new google.maps.LatLng(document.lat, document.lng),
			map: map.instance,
			// We store the document _id on the marker in order 
			// to update the document within the 'dragend' event below.
			id: document._id
		  });
	  
		  // This listener lets us drag markers on the map and update their corresponding document.
		  google.maps.event.addListener(marker, 'dragend', function(event) {
			Markers.update(marker.id, { $set: { lat: event.latLng.lat(), lng: event.latLng.lng() }});
		  });
	  
		  // Store this marker instance within the markers object.
		  markers[document._id] = marker;
		},
		changed: function(newDocument, oldDocument) {
		  markers[newDocument._id].setPosition({ lat: newDocument.lat, lng: newDocument.lng });
		},
		removed: function(oldDocument) {
		  // Remove the marker from the map
		  markers[oldDocument._id].setMap(null);
		  
		  // Clear the event listener
		  google.maps.event.clearInstanceListeners(
			markers[oldDocument._id]);
			
		  // Remove the reference to this marker instance
		  delete markers[oldDocument._id];
		}
	  });
  
	});
});
