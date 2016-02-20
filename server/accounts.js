Accounts.onCreateUser((options, user) => {
    //username has already been checked for duplicate
    //check password length and email
    if(options.password.length < 6) return new Error();
    let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(options.email && !regex.test(options.email)) return new Error();

    //Insert modification code here

    //if no error return user or modified user object

    return user;

});
Meteor.methods({
    createNewAccount: (fields, callback) => {
        Accounts.createUser({username: fields.username, email: fields.email, password: fields.password},callback);
    }

});