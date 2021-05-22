import './accueilNvxRouge.html';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { Template } from 'meteor/templating'; 


// ReactiveVars Red
	// RV carte réseau macro 
Template.accueilRouge.onCreated(function(){
	this.showCosmos = new ReactiveVar( true );
	});

Template.accueilRouge.helpers({
	showCosmos: function() {
		return Template.instance().showCosmos.get();
	}
});

Template.accueilRouge.events({
	'change select': function( event, template ) {
	  if ( $( event.target ).val() === "carteRed" ) {
		template.showCosmos.set( true );
	  } else {
		template.showCosmos.set( false );
	  }
	}
  });

  	// RV Swipe 
Template.accueilRouge.onCreated(function(){
	this.showSwipe = new ReactiveVar( false );
	});

Template.accueilRouge.helpers({
	showSwipe: function() {
		return Template.instance().showSwipe.get();
	}
});

Template.accueilRouge.events({
	'change select': function( event, template ) {
	  if ( $( event.target ).val() === "swipe" ) {
		template.showSwipe.set( true );
	  } else {
		template.showSwipe.set( false );
	  }
	}
  });

    	// RV feed macro 
Template.accueilRouge.onCreated(function(){
	this.showFeedMacro = new ReactiveVar( false );
	});

Template.accueilRouge.helpers({
	showFeedMacro: function() {
		return Template.instance().showFeedMacro.get();
	}
});

Template.accueilRouge.events({
	'change select': function( event, template ) {
	  if ( $( event.target ).val() === "feedRed" ) {
		template.showFeedMacro.set( true );
	  } else {
		template.showFeedMacro.set( false );
	  }
	}
  });



Template.logoutRéglages.events({
    'click #logout'(event) {
		event.preventDefault();
		Meteor.logout();
        setTimeout(() => FlowRouter.go('log'), 200);
			},

	'click #boutonPref'(event) {
		setTimeout(() => FlowRouter.go('preferences'), 200);
			}
		});



// Création de la carte pour accueil rouge
if (Meteor.isClient) {
	var MAP_ZOOM = 15;

		Meteor.startup(function() {
		GoogleMaps.load();
		});

		Template.redMap.onCreated(function() {
		var self = this;

		GoogleMaps.ready('redMap', function(map) {
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
				map: redMap.instance
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
		Template.redMap.helpers({
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
