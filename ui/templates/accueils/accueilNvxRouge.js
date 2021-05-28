import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

import './accueilNvxRouge.html';
/*
import 'jquery-ui-dist/jquery-ui'
import 'jquery-ui-dist/jquery-ui.css'
*/



// ReactiveVars Red
	// RV carte réseau macro, Swipe, recherche et feed
Template.accueilRouge.onCreated(function(){
	this.showCosmos = new ReactiveVar( true );
	this.showSwipe = new ReactiveVar( false );
	this.showFeedMacro = new ReactiveVar( false );
	this.showSearch = new ReactiveVar( false );

	this.prof = new ReactiveVar(true);
});

Template.accueilRouge.helpers({
	//RV
	showCosmos: function() {
		return Template.instance().showCosmos.get();
	},

	showSwipe: function() {
		return Template.instance().showSwipe.get();
	},

	showFeedMacro: function() {
		return Template.instance().showFeedMacro.get();
	},
	showSearch: function() {
		return Template.instance().showSearch.get();
	},

	//recherche Utilisateurs
});

Template.accueilRouge.events({
	'change select': function( event, template ) {
		if ( $( event.target ).val() === "carteRed" ) {
		template.showCosmos.set( true );
		} else {
		template.showCosmos.set( false );
		}
		if ( $( event.target ).val() === "swipe" ) {
		template.showSwipe.set( true );
		} else {
		template.showSwipe.set( false );
		}
		if ( $( event.target ).val() === "feedRed" ) {
		template.showFeedMacro.set( true );
		} else {
		template.showFeedMacro.set( false );
		}
		if ( $( event.target ).val() === "searchProfil" ) {
		template.showSearch.set( true );
		} else {
		template.showSearch.set( false );
		}
	},

	//recherche utilisateurs
	'click #searchProfil'(event, template) {
		event.preventDefault();  
		var search = document.getElementById("search").value;
		var finds = document.getElementById("finds");
		template.prof.set(Meteor.users.find({ username: search }).fetch());
		console.log(Meteor.users.find({ username: search }).fetch());
		//var foundUser = Meteor.users.find({ username: search }).fetch();
		if (template.prof.get()) {
		  finds.innerHTML = `We found a match: <br> <b>${template.prof.get()[0].profile.firstName} ${template.prof.get()[0].profile.lastName} </b> 
		  (${template.prof.get()[0].profile.Nickname}) <button id="viewP">view profile</button>`
		} else {
		  finds.innerHTML = "We didn't find any match. Make sure there is no typo!" 
		}
	  },
	  'click #viewP'(event) {
		event.preventDefault();  
		var viewP = document.getElementById("viewP");
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



  /*
Template.profilPersoContact.helpers({
    getPhoto: function() {
      if (foundUser) return foundUser.picture
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
      let user = Meteor.user().profile.PrefPronouns;
      let PP = `Would like to be adressed as ${user}`;
      if (user) return PP                             
	  },
    getNickname: function() {
      let user = Meteor.user().profile.Nickname;
      let NN = `Also known as ${user}`;
      if (user) {
        return NN
      } 
     },     
    getBday: function() {
    let user = Meteor.user().profile.birthday;
    let BD = `Born on ${user}`;
    if (user) {
      return BD
     }                             
  },
    getLiens: function() {
    let user = Meteor.user().profile.plateformes;
    var ptf = document.getElementById("ptf");
    let linktab = [];
    if (user) {
      for (let i = 0; i < user.length; i++) {
        let element = user[i];
        let Phref = `<br>` + `<a href=${element[1]}>${element[0]}</a>`;
        linktab.push(Phref);
        ptf.innerHTML = `Find ${Meteor.user().profile.firstName} on: <br> `+ linktab;
       }
     }                             
  },
  getExp: function() {
    let user = Meteor.user().profile.experiences;
    var expCv = document.getElementById("expCv");
    let exptab = [];
    if (user) {
      for (let i = 0; i < user.length; i++) {
        let element = user[i];
        let explist = `<br>` + `<b>${element[0]}</b> : ${element[1]}`;
        exptab.push(explist);
        expCv.innerHTML = ` ${Meteor.user().profile.firstName}'s experiences<br>` + exptab + `<br>` ;
       }
     }                             
  },
  getBio: function() {
    let user = Meteor.user().profile.autoBio;
    let Abio = `${user}`;
    if (user) {
      return Abio
     }                            
  },
});

  */

/* Swipe */
/*
$('.js-lazyload').lazyload({
	effect: 'fadeIn',
	threshold: 50,
});

var $topCard,
deltaThreshold = 100,
deltaX = 0;

function swipeEnded(event, direction, $card) {
	var  directionFactor,
	transform;
	if (event.type === 'click') {
		directionFactor = direction === 'right' ? -1 : 1;
	}
	else if (event.deltaX) {
		directionFactor = event.deltaX >= 0 ? -1 : 1;
	}
	if ( event.deltaX && deltaX > deltaThreshold || event.deltaX && deltaX < -1 * deltaThreshold || direction) {
		transform = 'translate(' + directionFactor * -100 + 'vw, 0) rotate(' + directionFactor * -5 + 'deg)';
		$card
		.delay(100)
		.queue(function () { 
			$(this).css('transform', transform).dequeue(); 
		})
		.delay(300)
		.queue(function () { 
			$(this).addClass('done').remove(); 
		});
		console.log('Swipe done. \nCard:', $card, '\nDirection:', directionFactor);
		
	}
	else {
		transform = 'translate(0, 0) rotate(0)';
		$card.css({
			'transform': transform,
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

	}) 
}*/

function swipeLeft(event, $card) {
	var transform;
	deltaX = event.deltaX;
	transform = 'translate(' + deltaX * 0.8 + 'px, 0) rotate(5deg)';
	//translate the card on swipe
	$card.css({
		'transform': transform,
	});
}

function swipeRight(event, $card) {
	var transform;
	deltaX = event.deltaX;
	transform = 'translate(' + deltaX * 0.8 + 'px, 0) rotate(-5deg)';
	//translate the card on swipe
	$card.css({
		'transform': transform,
	});
}

/*Pour les interactions sur les écrans des tel portables */
/*
$('.js-swiping-card').each(function(index, element) {
	var $card = $(element),
	hammertime = new Hammer(element);
	hammertime.on('panleft swipeleft', function(event) {
		swipeLeft(event, $card);
	});
	hammertime.on('panright swiperight', function(event) {
		swipeRight(event, $card);
	});
	hammertime.on('panend', function(event) {
		swipeEnded(event, false, $card);
	});
});

$('.js-left-trigger').on('click', function(event) {
	var $topCard= $('.js-swiping-card').last();
	swipeEnded(event, 'left', $topCard);
});
$('.js-right-trigger').on('click', function(event) {
  var $topCard = $('.js-swiping-card').last();
  swipeEnded(event, 'right', $topCard);
}); 
*/
