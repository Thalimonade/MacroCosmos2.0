import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

// base de données markers map
export const Markers = new Mongo.Collection('markers');

if (Meteor.isServer) {
  Meteor.publish('markers', function publierMarkers() {
    return Markers.find();
  })
}

// methodes map
Meteor.methods({
  'markers.insert': (lat, lng) => {
    const ajout = Markers.insert({
      lat: lat,
      lng: lng
    },
    (err, res) => {
      if (err) {
        alert(err.message);
      } else {}
    })
    return ajout
  }
})

// base de données feed rouge
export const ObjetsRedFeed = new Mongo.Collection('objets_redFeed');

// methodes feed rouge
Meteor.methods({
  ajouterPost: function (texte) {
    let add = ObjetsRedFeed.insert({
      contenu: texte
    })
    console.log('ok');
    return add;
  },
  retournerPosts() {
    let post = ObjetsRedFeed.find({});
    return post;
  }
});