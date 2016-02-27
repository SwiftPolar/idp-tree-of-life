var getConversationId = function (fromUser, toUser) {
    let fromId = fromUser;
    let to = Meteor.users.findOne({username: toUser});
    if (!to) throw new Error('no such user');
    let toId = to._id;
    let id = toId;
    (fromId > toId) ? (id = id + "" + fromId) : (id = fromId + "" + id);

    //convert to hash code

    var hash = 0, i, chr, len;
    if (id.length === 0) return hash;
    for (i = 0, len = id.length; i < len; i++) {
        chr = id.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }

    return hash;
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
    },

    getUniqueChat: function () {
        if (!Meteor.userId()) throw new Error('not authorized');
        return Meteor.wrapAsync(function (callback) {
            Messages.rawCollection().distinct("id", callback);
        })();
    },

    getMessages: () => {
        if (!Meteor.userId()) throw new Error('not authorized');
        let temp = new Mongo.Collection(null);
        let uniqueId = Meteor.call('getUniqueChat');
        uniqueId.map((id) => {
            temp.insert(Messages.findOne({id: id}, {sort: {date: -1}}));
        });
        let username = Meteor.user().username;
        let result = temp.find( { $or: [ { from: username }, { to: username } ] }, { sort: { date: -1 }} ).fetch();
        temp = null;
        return result;
    }
});

Meteor.publish('getChatMessages', function (toUser) {
    if (!this.userId) throw new Error('not authorized');
    let id = getConversationId(this.userId, toUser);
    return Messages.find({id: id}, {sort: {date: 1}});
});