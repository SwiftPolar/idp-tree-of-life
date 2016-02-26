var getConversationId = function (fromUser, toUser) {
    let fromId = fromUser;
    let to = Meteor.users.findOne({username: toUser});
    if (!to) throw new Error('no such user');
    let toId = to._id;
    let id = toId;
    (fromId > toId) ? (id = id + "" + fromId) : (id = fromId + "" + id);
    return id;
};

Meteor.methods({
    submitMessage: (toUser, message) => {
        if (!Meteor.userId()) throw new Error('not authorized');
        let id = getConversationId(Meteor.userId(), toUser);
        Messages.insert({
            id: id,
            to: toUser,
            from: Meteor.user().username,
            date: new Date(),
            message: message
        });
    }
});

Meteor.publish('getChatMessages', function (toUser) {
    if (!this.userId) throw new Error('not authorized');
    let id = getConversationId(this.userId, toUser);
    return Messages.find({id: id}, {sort: {date: 1}});
});
