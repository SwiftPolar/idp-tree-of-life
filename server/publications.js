Meteor.publish("tasks", () => {
    return Tasks.find();
});

Meteor.publish("task", (id) => {
    return Tasks.find({_id: id});
});
