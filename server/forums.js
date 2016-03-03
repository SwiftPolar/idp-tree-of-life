Meteor.methods({
    newTopic: (title, category, content, media) => {
        //check if logged in
        if (!Meteor.userId()) {
            throw new Error("User not logged in!")
        }
        if (!title || !category || !content) {
            throw new Error("Invalid number of fields!");
        }

        let result = Topics.insert({
            title: title,
            category: category,
            content: content,
            owner: Meteor.user().username,
            date: new Date(),
            media: media
        });

        return result;
    },

    newReply: (topic, content) => {
        if (!Meteor.userId()) {
            throw new Error("User not logged in!")
        }
        if (!topic || !content) {
            throw new Error("Invalid number of fields!");
        }

        let result = Replies.insert({
            topic: topic,
            content: content,
            owner: Meteor.user().username,
            date: new Date()
        });
        //notify only when not own user replying!
        let check = Topics.findOne({_id: topic});
        if (check.owner !== Meteor.user().username) {
            notify('topic', topic, Meteor.user().username);
        }
        return result;
    },
});

Meteor.publish('getTopics', function () {
    //only let registered users get topics
    if (!this.userId) return null;
    return Topics.find();
});

Meteor.publish('getUserTopics', function (username) {
    //only let registered users get topics
    if (!this.userId) return null;
    return Topics.find({owner: username});
});

Meteor.publish('getComments', function (id) {
    //only let registered users get topics
    if (!this.userId) return null;
    return Topics.find({_id: id});
});

Meteor.publish('getReplies', (id) => {
    return Replies.find({topic: id});
});
