import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

import './login.html';

Template.LoginSignUp.events({
    'click #logIn'(event) {
		event.preventDefault();
		let nom = document.getElementById('user').value;
		let mdp = document.getElementById('pwd').value;
		Meteor.loginWithPassword(nom, mdp, (error) => {
			if (error) {
				alert(error.message);
			} else {
				setTimeout(() => FlowRouter.go('Ableu'), 200);
			}
		});
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
	   console.log("I'm ready!");
	});
  });