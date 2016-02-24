Meteor.publish('getUserImages', function () {
    let user = Meteor.users.findOne({_id: this.userId});
    return Images.find({owner: user.username});
});