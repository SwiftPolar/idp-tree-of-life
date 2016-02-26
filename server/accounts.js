Accounts.onCreateUser((options, user) => {
    //username has already been checked for duplicate
    //check password length and email
    if (options.password.length < 6) return new Error();
    let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (options.email && !regex.test(options.email)) return new Error();

    //Insert modification code here

    //if no error return user or modified user object

    return user;

});
Meteor.methods({
    createNewAccount: (fields, callback) => {
        Accounts.createUser({username: fields.username, email: fields.email, password: fields.password}, callback);
    },

    getUserProfile: (username) => {
        if (!Meteor.user()) return null;
        let now = new Date();
        let before = new Date();
        before.setDate(before.getDate() - 7);
        let images = Images.find(
            {
                public: true,
                owner: username
            },
            {
                sort: {date: -1}
            }
        ).fetch();

        let topics = Topics.find(
            {
                owner: username,
                date: {$lte: now, $gte: before}
            },
            {
                sort: {date: -1},
                limit: 5
            }).fetch();

        let comments = Comments.find(
            {
                owner: username,
                date: {$lte: now, $gte: before}
            },
            {
                sort: {date: -1},
                limit: 5
            }).fetch();

        let temp = new Mongo.Collection(null);

        let activity = topics.concat(comments);

        activity.map((obj) => {
            temp.insert(obj);
        });
        //get last 10 elements
        activity = temp.find({}, {
            sort: {date: -1},
            limit: 5
        }).fetch();

        //remove temp collection from memory
        temp = null;

        let result = {
            images: images,
            activity: activity
        };

        return result;

    }

});