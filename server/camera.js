Meteor.methods({
    uploadImage: (image, tag, description, public) => {
        if (!Meteor.userId()) return null;
        if (!image || public == null) return null;

        if (!tag) tag = "";
        if (!description) description = "";

        tagArr = tag.split("#");
        for (let i = 0; i < tagArr; i++) {
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
    },

    editImage: (id, image, tag, description, public) => {
        if (!Meteor.userId()) return null;
        if (!image || public == null) return null;

        let imageCheck = Images.find({_id: id}).fetch()[0];
        if (imageCheck.owner !== Meteor.user().username) throw new Error("Not authorized!");

        if (!tag) tag = "";
        if (!description) description = "";

        tagArr = tag.split("#");
        for (let i = 0; i < tagArr; i++) {
            tagArr[i] = tagArr[i].trim();
        }

        let result = Images.update({_id: id}, {
            $set: {
                image: image,
                description: description,
                tag: tagArr,
                public: public
            }
        });

        return result;
    },

    deleteImage: (id) => {
        if (!Meteor.userId()) return null;
        if (!id) return null;

        let imageCheck = Images.find({_id: id}).fetch()[0];
        if (imageCheck.owner !== Meteor.user().username) throw new Error("Not authorized!");

        Images.remove({_id: id});
    }
});