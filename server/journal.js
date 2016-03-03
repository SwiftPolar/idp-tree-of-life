Meteor.methods({
    newJournal: (title, content, media) => {
        if (!Meteor.userId()) {
            throw new Error("User not logged in!")
        }
        if (!title || !media || !content) {
            throw new Error("Invalid number of fields!");
        }

        let result = Journal.insert({
            title: title,
            content: content,
            owner: Meteor.user().username,
            date: new Date(),
            media: media
        });

        return result;
    },
    editJournal: (id, title, content, media) => {
        if (!Meteor.userId()) {
            throw new Error("User not logged in!")
        }
        if (!title || !media || !content) {
            throw new Error("Invalid number of fields!");
        }

        let check = Journal.findOne({_id: id});
        if (check.owner !== Meteor.user().username) throw new Error('not authorized');

        let result = Journal.update({_id: id}, {
            $set: {
                title: title,
                content: content,
                media: media
            }
        });

        return result;
    },

    deleteJournal: (id) => {
        if (!Meteor.userId()) return null;
        if (!id) return null;

        let journalCheck = Journal.find({_id: id}).fetch()[0];
        if (journalCheck.owner !== Meteor.user().username) throw new Error("Not authorized!");

        Journal.remove({_id: id});
    }
});

Meteor.publish('getAllJournal', function () {
    let user = Meteor.users.findOne({_id: this.userId});
    let cursor = Journal.find({owner: user.username});
    return cursor;
});

Meteor.publish('getJournalEntry', function (id) {
    let user = Meteor.users.findOne({_id: this.userId});
    let cursor = Journal.find({_id: id});
    let entry = cursor.fetch()[0];

    //check if post is public
    if (user.username !== entry.owner) {
        return null;
    } else {
        return cursor;
    }
});

Meteor.publish('getImagesById', function (ids) {
    let user = Meteor.users.findOne({_id: this.userId});
    return Images.find({_id: {$in: ids}, owner: user.username});
});