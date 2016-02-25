import {composeWithTracker} from 'react-komposer'
import ViewEntry from '../components/ViewEntry.jsx';

function composer(props, onData) {
    const handle = Meteor.subscribe('getJournalEntry', props.params.id);
    if(handle.ready()) {
        let entry = Journal.findOne({_id: props.params.id});

        let mediaId = entry.media;
        const imageHandle = Meteor.subscribe('getImagesById', mediaId);
        let images = {};
        if(imageHandle.ready()) {
            images = Images.find({}, {sort: {date: -1}}).fetch();
            if(!entry) {
                entry = new Error("not authorized");
            }

            onData(null, {entry, images});
        }
    }
}

export default composeWithTracker(composer)(ViewEntry);