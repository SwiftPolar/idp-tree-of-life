import {composeWithTracker} from 'react-komposer'
import ViewTopic from '../components/ViewTopic.jsx';

function composer(props, onData) {
    const handle = Meteor.subscribe('getTopic', props.params.id);
    const replyHandle = Meteor.subscribe('getReplies', props.params.id);
    if(handle.ready() && replyHandle.ready()) {
        let topic = Topics.findOne({_id: props.params.id});
        let replies = Replies.find({topic: props.params.id}, {sort: {date: -1}}).fetch();
        if(!topic) {
            topic = new Error("404 Topic Not Found!");
        }

        onData(null, {topic,replies});
    }
}

export default composeWithTracker(composer)(ViewTopic);