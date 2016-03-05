import {composeWithTracker} from 'react-komposer'
import ViewTopic from '../components/ViewTopic.jsx';

function composer(props, onData) {
    const handle = Meteor.subscribe('getComments', props.params.id);
    const replyHandle = Meteor.subscribe('getReplies', props.params.id);
    if(handle.ready() && replyHandle.ready()) {
        let topic = Topics.findOne({_id: props.params.id});
        let mediaId = topic.media;
        if(!mediaId) mediaId = [];
        const imageHandle = Meteor.subscribe('getTopicImagesById', mediaId);
        let images = {};
        if(imageHandle.ready()) {
            images = Images.find({}, {sort: {date: -1}}).fetch();
            let replies = Replies.find({topic: props.params.id}, {sort: {date: 1}}).fetch();
            if(!topic) {
                topic = new Error("404 Topic Not Found!");
            }

            onData(null, {topic, replies, images});
        }

    }
}

export default composeWithTracker(composer)(ViewTopic);