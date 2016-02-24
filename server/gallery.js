Meteor.publish('getUserImages', function () {
    let user = Meteor.users.findOne({_id: this.userId});
    return Images.find({owner: user.username});
});

Meteor.publish('getUserImage', function (id) {
    let user = Meteor.users.findOne({_id: this.userId});
    let cursor = Images.find({_id: id});
    let image = cursor.fetch()[0];

    //check if post is public
    if (image.public == false && user.username != image.owner) {

        return null;
    } else {
        return cursor;
    }
});

