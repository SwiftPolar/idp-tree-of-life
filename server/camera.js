Meteor.methods({
    uploadImage: (image, tag, description, public) => {
        if(!Meteor.userId()) return null;
        if(!image || public == null) return null;

        if(!tag) tag = "";
        if(!description) description = "";

        tagArr = tag.split("#");
        for(let i = 0; i < tagArr; i++) {
            tagArr[i] = tagArr[i].trim();
        }

        let result = Images.insert({
            image: image,
            description: description,
            tag: tagArr,
            owner: Meteor.user().username,
            date: new Date(),
            public: public
        });

        return result;
    }
});