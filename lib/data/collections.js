
if(Meteor.isServer) {
}

Topics = new Mongo.Collection("topics");
Replies = new Mongo.Collection("replies");
Images = new Mongo.Collection("images");
Journal = new Mongo.Collection("journal");
Comments = new Mongo.Collection("comments");
Notifications = new Mongo.Collection("notifications");