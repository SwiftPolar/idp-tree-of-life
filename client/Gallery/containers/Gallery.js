import {composeWithTracker} from 'react-komposer'
import Gallery from '../components/Gallery.jsx';

function composer(props, onData) {
    const handle = Meteor.subscribe('getUserImages');
    if(handle.ready()) {
        let images = Images.find({}, {sort: {date: -1}, reactive: false}).fetch();

        if(!images) {
            images = new Error("No Images");
        }

        onData(null, {images});
    }
}

export default composeWithTracker(composer)(Gallery);