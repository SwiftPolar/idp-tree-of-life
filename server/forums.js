Meteor.methods({
    newTopic: (title, category, content) => {
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
            date: new Date()
        });

        return result;
    }
});

Meteor.publish('getTopics', () => {
    //only let registered users get topics
    //if (!this.userId) return null;
    return Topics.find();
});