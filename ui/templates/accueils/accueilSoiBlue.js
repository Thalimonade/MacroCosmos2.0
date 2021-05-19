import './accueilSoiBlue.html';
import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Template } from 'meteor/templating'; 
import { Messages } from '../../../import/api/messages'; 
import { error } from 'jquery';

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