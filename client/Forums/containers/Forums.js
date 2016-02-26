import {composeWithTracker} from 'react-komposer'
import ViewTopics from '../components/Forums.jsx';

function composer(props, onData) {
    let handle;
    if(!props.params.username) {
        handle = Meteor.subscribe('getTopics');
    } else {
        handle = Meteor.subscribe('getUserTopics', props.params.username);
    }
    if(handle.ready()) {
        let topics = Topics.find({}, {sort: {date: -1}}).fetch();

        if(!topics) {
            topics = new Error("404 Topic Not Found!");
        }

        onData(null, {topics});
    }
}

export default composeWithTracker(composer)(ViewTopics);