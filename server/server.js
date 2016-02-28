notify = function (type, typeId, from) {

    let link, to;

    switch (type) {
        case 'topic':
            link = typeId;
            to = Topics.findOne({_id: link}).owner;
            break;

        case 'image':
            link = typeId;
            to = Images.findOne({_id: link}).owner;
            break;

        default:
            throw new Error("no such type");
            break;
    }

    Notifications.insert({
        date: new Date(),
        from: from,
        to: to,
        link: link,
        type: type
    });
};

Meteor.publish('getUserNotifications',function() {
    if(!this.userId) throw new Error("not authorized");
    let user = Meteor.users.findOne({_id: this.userId});
    return Notifications.find({to: user.username},{sort: {date: -1}});
});

Meteor.publish('haveNotifications',function() {
    if(!this.userId) throw new Error("not authorized");
    let user = Meteor.users.findOne({_id: this.userId});
    return Notifications.find({to: user.username},{limit: 1, sort: {date: -1}});
});

Meteor.methods({
   clearAllNotifications: () => {
       if(!Meteor.user()) throw new Error('not authorized');
       Notifications.remove({to: Meteor.user().username});
   }
});