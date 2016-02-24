Tasks = new Mongo.Collection("tasks");
if(Meteor.isServer) {
    Tasks.remove({});
    Tasks.insert({
        _id: 'one', title: 'New Meteor Rocks', content: 'Yeah! Check our Meteor Blog for more!'
    });
    Tasks.insert({_id: 'two', title: 'MeteorHacks + Kadira => Kadira++', content: 'Something new soon.'});
    Tasks.insert({_id: 'three', title: 'My Secret Post', category: 'private'});
}

Topics = new Mongo.Collection("topics");
Replies = new Mongo.Collection("replies");
Images = new Mongo.Collection("images");