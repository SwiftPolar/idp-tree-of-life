import {composeWithTracker} from 'react-komposer'
import Image from '../components/Image.jsx';

function composer(props, onData) {

    const handle = Meteor.subscribe('getUserImage', props.params.id);
    const handleComments = Meteor.subscribe('getImageComments', props.params.id);

    if(handle.ready() && handleComments.ready()) {
        let images = Images.findOne({}, {reactive: false});
        let comments = Comments.find({}, {sort: {date: -1}}).fetch();

        if(!images) {
            images = new Error("404 Image not found!");
        }

        onData(null, {images, comments});
    }
}

export default composeWithTracker(composer)(Image);