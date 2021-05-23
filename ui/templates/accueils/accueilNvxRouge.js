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

	//rechercher des utilisateur 
Template.accueilRouge.events({
  'click #searchProfil'(event) {
	event.preventDefault();  
	var search = document.getElementById("search").value;
	var finds = document.getElementById("finds");
	console.log(Meteor.users.find({ username: search }).fetch());
	foundUser = Meteor.users.find({ username: search }).fetch();
	finds.innerHTML = `We found a match: <br> <b>${foundUser[0].profile.firstName} ${foundUser[0].profile.lastName} </b> 
	(${foundUser[0].profile.Nickname}) <button id="viewP">view profile</button>`
  } // TROUVER UN MOYEN DE LIER CE BOUTON A UNE RéACTIVE
  // VAR POUR AFFICHER LE PROFILE
})

	/*'use strict';

var tinderContainer = document.querySelector('.tinder');
var allCards = document.querySelectorAll('.tinder--card');
var nope = document.getElementById('nope');
var love = document.getElementById('love');*/

	/*Template.Swipe.helpers({
		initCards: function(card, index) {
			var newCards = document.querySelectorAll('.tinder--card:not(.removed)');
		  
			newCards.forEach(function (card, index) {
			  card.style.zIndex = allCards.length - index;
			  card.style.transform = 'scale(' + (20 - index) / 20 + ') translateY(-' + 30 * index + 'px)';
			  card.style.opacity = (10 - index) / 10;
			});
			
			tinderContainer.classList.add('loaded');

			allCards.forEach(function (el) {
				var hammertime = new Hammer(el);
			  
				hammertime.on('pan', function (event) {
				  el.classList.add('moving');
				});
			  
				hammertime.on('pan', function (event) {
				  if (event.deltaX === 0) return;
				  if (event.center.x === 0 && event.center.y === 0) return;
			  
				  tinderContainer.classList.toggle('tinder_love', event.deltaX > 0);
				  tinderContainer.classList.toggle('tinder_nope', event.deltaX < 0);
			  
				  var xMulti = event.deltaX * 0.03;
				  var yMulti = event.deltaY / 80;
				  var rotate = xMulti * yMulti;
			  
				  event.target.style.transform = 'translate(' + event.deltaX + 'px, ' + event.deltaY + 'px) rotate(' + rotate + 'deg)';
				});
			  
				hammertime.on('panend', function (event) {
				  el.classList.remove('moving');
				  tinderContainer.classList.remove('tinder_love');
				  tinderContainer.classList.remove('tinder_nope');
			  
				  var moveOutWidth = document.body.clientWidth;
				  var keep = Math.abs(event.deltaX) < 80 || Math.abs(event.velocityX) < 0.5;
			  
				  event.target.classList.toggle('removed', !keep);
			  
				  if (keep) {
					event.target.style.transform = '';
				  } else {
					var endX = Math.max(Math.abs(event.velocityX) * moveOutWidth, moveOutWidth);
					var toX = event.deltaX > 0 ? endX : -endX;
					var endY = Math.abs(event.velocityY) * moveOutWidth;
					var toY = event.deltaY > 0 ? endY : -endY;
					var xMulti = event.deltaX * 0.03;
					var yMulti = event.deltaY / 80;
					var rotate = xMulti * yMulti;
			  
					event.target.style.transform = 'translate(' + toX + 'px, ' + (toY + event.deltaY) + 'px) rotate(' + rotate + 'deg)';
					initCards();
				  }
				});
			  });
		  },
		  
		  createButtonListener: function(love) {
			return function (event) {
			  var cards = document.querySelectorAll('.tinder--card:not(.removed)');
			  var moveOutWidth = document.body.clientWidth * 1.5;
		  
			  if (!cards.length) return false;
		  
			  var card = cards[0];
		  
			  card.classList.add('removed');
		  
			  if (love) {
				card.style.transform = 'translate(' + moveOutWidth + 'px, -100px) rotate(-30deg)';
			  } else {
				card.style.transform = 'translate(-' + moveOutWidth + 'px, -100px) rotate(30deg)';
			  }
		  
			  initCards();
		  
			  event.preventDefault();
			};
		}	  
	});*/

	/*function initCards(card, index) {
		var newCards = document.querySelectorAll('.tinder--card:not(.removed)');
	  
		newCards.forEach(function (card, index) {
		  card.style.zIndex = allCards.length - index;
		  card.style.transform = 'scale(' + (20 - index) / 20 + ') translateY(-' + 30 * index + 'px)';
		  card.style.opacity = (10 - index) / 10;
		});
		
		tinderContainer.classList.add('loaded');
	  }
	  
	  initCards();

	  allCards.forEach(function (el) {
		var hammertime = new Hammer(el);
	  
		hammertime.on('pan', function (event) {
		  el.classList.add('moving');
		});
	  
		hammertime.on('pan', function (event) {
		  if (event.deltaX === 0) return;
		  if (event.center.x === 0 && event.center.y === 0) return;
	  
		  tinderContainer.classList.toggle('tinder_love', event.deltaX > 0);
		  tinderContainer.classList.toggle('tinder_nope', event.deltaX < 0);
	  
		  var xMulti = event.deltaX * 0.03;
		  var yMulti = event.deltaY / 80;
		  var rotate = xMulti * yMulti;
	  
		  event.target.style.transform = 'translate(' + event.deltaX + 'px, ' + event.deltaY + 'px) rotate(' + rotate + 'deg)';
		});
	  
		hammertime.on('panend', function (event) {
		  el.classList.remove('moving');
		  tinderContainer.classList.remove('tinder_love');
		  tinderContainer.classList.remove('tinder_nope');
	  
		  var moveOutWidth = document.body.clientWidth;
		  var keep = Math.abs(event.deltaX) < 80 || Math.abs(event.velocityX) < 0.5;
	  
		  event.target.classList.toggle('removed', !keep);
	  
		  if (keep) {
			event.target.style.transform = '';
		  } else {
			var endX = Math.max(Math.abs(event.velocityX) * moveOutWidth, moveOutWidth);
			var toX = event.deltaX > 0 ? endX : -endX;
			var endY = Math.abs(event.velocityY) * moveOutWidth;
			var toY = event.deltaY > 0 ? endY : -endY;
			var xMulti = event.deltaX * 0.03;
			var yMulti = event.deltaY / 80;
			var rotate = xMulti * yMulti;
	  
			event.target.style.transform = 'translate(' + toX + 'px, ' + (toY + event.deltaY) + 'px) rotate(' + rotate + 'deg)';
			initCards();
		  }
		});
	  });

	function createButtonListener(love) {
		return function (event) {
		  var cards = document.querySelectorAll('.tinder--card:not(.removed)');
		  var moveOutWidth = document.body.clientWidth * 1.5;
	  
		  if (!cards.length) return false;
	  
		  var card = cards[0];
	  
		  card.classList.add('removed');
	  
		  if (love) {
			card.style.transform = 'translate(' + moveOutWidth + 'px, -100px) rotate(-30deg)';
		  } else {
			card.style.transform = 'translate(-' + moveOutWidth + 'px, -100px) rotate(30deg)';
		  }
	  
		  initCards();
	  
		  event.preventDefault();
		};
	  }

	var nopeListener = createButtonListener(false);
	 var loveListener = createButtonListener(true);
		  
	Template.Swipe.events({
		'click #nope'(event){
			event.preventDefault();
			nopeListener
		},
		'click #love'(event){
			event.preventDefault();
			loveListener
		}

	}) */
