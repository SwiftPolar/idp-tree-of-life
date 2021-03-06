import {composeWithTracker} from 'react-komposer'
import AttachMedia from '../components/AttachMedia.jsx';

function composer(props, onData) {
    //check for necessary props
    if(!props.onSelect) throw new Error("Missing required components!");
    let arr = [];
    if(props.selected.length > 0) arr = props.selected;

    let public = false;
    if(props.public) public = true;

    const handle = Meteor.subscribe('getUserImages');
    if(handle.ready()) {
        let images;
        if(public) {
            images = Images.find({public: true}, {sort: {date: -1}, reactive: false}).fetch();
        } else {
            images = Images.find({}, {sort: {date: -1}, reactive: false}).fetch();
        }

        if(!images) {
            images = new Error("No Images");
        }

        onData(null, {images, selected: arr, onSelect: props.onSelect});
    }
}

export default composeWithTracker(composer)(AttachMedia);