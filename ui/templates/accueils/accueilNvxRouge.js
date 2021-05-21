import './accueilNvxRouge.html';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { Template } from 'meteor/templating'; 


// ReactiveVars Red
	// RV carte réseau macro 
Template.accueilRouge.onCreated(function(){
	this.showCosmos = new ReactiveVar( false );
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


