Meteor.publish('getUserImages', function () {
    if (!this.userId) throw new Error("not authorized");
    let user = Meteor.users.findOne({_id: this.userId});
    return Images.find({owner: user.username});
});

Meteor.publish('getUserImage', function (id) {
    let user = Meteor.users.findOne({_id: this.userId});
    let cursor = Images.find({_id: id});
    if (!cursor) throw new Error("404 not found");
    let image = cursor.fetch()[0];

    //check if post is public
    if (image.public === false && user.username != image.owner) {

        return null;
    } else {
        return cursor;
    }
});

Meteor.publish('getImageComments', function (id) {
    let user = Meteor.users.findOne({_id: this.userId});
    let cursor = Images.find({_id: id});
    let image = cursor.fetch()[0];

    //check if post is public
    if (image.public === false && user.username != image.owner) {

        return null;
    } else {
        return Comments.find({image: id});
    }
});

Meteor.methods({
    commentImage: (id, content) => {
        if (!Meteor.userId()) return null;
        if (!content || !id) return null;

        let imageCheck = Images.find({_id: id}).fetch()[0];
        if (imageCheck.public === false &&
            imageCheck.owner !== Meteor.user().username) throw new Error("Not authorized!");

        let result = Comments.insert({
            date: new Date(),
            owner: Meteor.user().username,
            comment: content,
            image: id
        });

        if (imageCheck.owner !== Meteor.user().username) {
            notify('image', id, Meteor.user().username);
        }

        return result;

    }
});