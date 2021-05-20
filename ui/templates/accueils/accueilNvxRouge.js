import './accueilNvxRouge.html';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { Template } from 'meteor/templating'; 


// ReactiveVars Red
	// RV carte réseau macro 
Template.accueilBleu.onCreated(function(){
	this.showCosmos = new ReactiveVar( false );
	});

Template.accueilBleu.helpers({
	showCosmos: function() {
		return Template.instance().showCosmos.get();
	}
});

Template.accueilBleu.events({
	'change select': function( event, template ) {
	  if ( $( event.target ).val() === "carteRed" ) {
		template.showCosmos.set( true );
	  } else {
		template.showCosmos.set( false );
	  }
	}
  });

  	// RV Swipe 
Template.accueilBleu.onCreated(function(){
	this.showSwipe = new ReactiveVar( false );
	});

Template.accueilBleu.helpers({
	showSwipe: function() {
		return Template.instance().showSwipe.get();
	}
});

Template.accueilBleu.events({
	'change select': function( event, template ) {
	  if ( $( event.target ).val() === "swipe" ) {
		template.showSwipe.set( true );
	  } else {
		template.showSwipe.set( false );
	  }
	}
  });

    	// RV feed macro 
Template.accueilBleu.onCreated(function(){
	this.showFeedMacro = new ReactiveVar( false );
	});

Template.accueilBleu.helpers({
	showFeedMacro: function() {
		return Template.instance().showFeedMacro.get();
	}
});

Template.accueilBleu.events({
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


