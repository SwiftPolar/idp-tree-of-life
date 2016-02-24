import {composeWithTracker} from 'react-komposer'
import Image from '../components/Image.jsx';

function composer(props, onData) {
    const handle = Meteor.subscribe('getUserImage', props.params.id);
    if(handle.ready()) {
        let images = Images.findOne({}, {reactive: false});

        if(!images) {
            images = new Error("404 Image not found!");
        }

        onData(null, {images});
    }
}

export default composeWithTracker(composer)(Image);