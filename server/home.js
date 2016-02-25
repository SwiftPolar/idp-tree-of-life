Meteor.publish('getPublicImages', function () {
    if (!this.userId) return null;
    let now = new Date();
    let before = new Date();
    before.setDate(before.getDate()-7);
    return Images.find({public: true, date: {$lte: now, $gte: before}}, {sort: {date: -1}});
});

Meteor.publish('getAllReplies', function () {
    if (!this.userId) return null;
    let now = new Date();
    let before = new Date();
    before.setDate(before.getDate()-7);
    return Replies.find({date: {$lte: now, $gte: before}}, {sort: {date: -1}});
});

Meteor.publish('getFeedTopics', function () {
    if (!this.userId) return null;
    let now = new Date();
    let before = new Date();
    before.setDate(before.getDate()-7);
    return Topics.find({date: {$lte: now, $gte: before}}, {sort: {date: -1}});
});

Meteor.methods({
   getFeed: () => {
       if (!Meteor.user()) return null;
       let now = new Date();
       let before = new Date();
       before.setDate(before.getDate()-7);
       let images = Images.find({public: true, date: {$lte: now, $gte: before}}, {sort: {date: -1}}).fetch();
       let topics = Topics.find({date: {$lte: now, $gte: before}}, {sort: {date: -1}}).fetch();
       let comments = Comments.find({date: {$lte: now, $gte: before}}, {sort: {date: -1}}).fetch();

       return images.concat(comments.concat(topics));


   }
});