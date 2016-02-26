//Please remove before production else implement necessary features to detect if admin!
//This is here just for testing and prototyping.
Meteor.methods({


    deleteTopic: (id) => {
        Topics.remove(id);
    },
});

Meteor.publish('getAllNotify', () => {
   return Notifications.find();
});

Meteor.publish('getAllMessages', () => {
    return Messages.find();
});