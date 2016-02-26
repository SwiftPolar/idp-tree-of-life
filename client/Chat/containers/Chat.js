import {composeWithTracker} from 'react-komposer'
import Chat from '../components/Chat.jsx';

function composer(props, onData) {
    let username = props.params.username;
    const handle = Meteor.subscribe('getChatMessages', username);

    if(handle.ready()) {
        let messages = Messages.find({}, {sort: {date: 1}}).fetch();

        if(!messages) {
            messages = new Error("No messages");
        }

        onData(null, {messages, username: username});
    }

}

export default composeWithTracker(composer)(Chat);