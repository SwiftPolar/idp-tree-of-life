import {composeWithTracker} from 'react-komposer'
import ViewTopics from '../components/Forums.jsx';

function composer(props, onData) {
    const handle = Meteor.subscribe('getTopics');
    if(handle.ready()) {
        let topics = Topics.find({}, {sort: {date: -1}}).fetch();

        if(!topics) {
            topics = new Error("404 Topic Not Found!");
        }

        onData(null, {topics});
    }
}

export default composeWithTracker(composer)(ViewTopics);