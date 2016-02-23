import {composeWithTracker} from 'react-komposer'
import ViewTopic from '../components/ViewTopic.jsx';

function composer(props, onData) {
    const handle = Meteor.subscribe('getTopic', props.params.id);
    if(handle.ready()) {
        let topic = Topics.findOne({_id: props.params.id});

        if(!topic) {
            topic = new Error("404 Topic Not Found!");
        }

        onData(null, {topic});
    }
}

export default composeWithTracker(composer)(ViewTopic);