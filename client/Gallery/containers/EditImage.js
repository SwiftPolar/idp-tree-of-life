import {composeWithTracker} from 'react-komposer'
import EditImage from '../components/EditImage.jsx';

function composer(props, onData) {
    const handle = Meteor.subscribe('getUserImage', props.params.id);
    if(handle.ready()) {
        let images = Images.findOne({}, {reactive: false});

        if(!images) {
            images = new Error("You do not have permission to do this!");
        }

        onData(null, {images});
    }
}

export default composeWithTracker(composer)(EditImage);