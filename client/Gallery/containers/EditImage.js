import {composeWithTracker} from 'react-komposer'
import EditImage from '../components/EditImage.jsx';

function composer(props, onData) {
    const handle = Meteor.subscribe('getUserImage', props.params.id);
    if(handle.ready()) {
        let images = Images.findOne({}, {reactive: false});
        let comments = Comments.find({}, {sort: {date: -1}}).fetch();

        if(!images) {
            images = new Error("You do not have permission to do this!");
        }

        onData(null, {images, comments});
    }
}

export default composeWithTracker(composer)(EditImage);