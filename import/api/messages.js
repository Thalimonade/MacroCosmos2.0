import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';

export const Messages = new Mongo.Collection('messages');

Meteor.methods({
    'messages.insert' (text) {
        check(text, String);

       /* if (! Meteor.userId()) {
            throw new Meteor.Error('Not-autorised');
        } */

        //var sender = Meteor.users.find({ username: Meteor.user().username }).fetch();

        Messages.insert({
            text, 
            userId: Meteor.user().username,
            CreatedAt: new Date()
        })
    },
})