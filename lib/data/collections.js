
if(Meteor.isServer) {
}

Topics = new Mongo.Collection("topics");
Replies = new Mongo.Collection("replies");
Images = new Mongo.Collection("images");
Comments = new Mongo.Collection("comments");