import {composeWithTracker} from 'react-komposer'
import ChatList from '../components/ChatList.jsx';

function composer(props, onData) {
    Meteor.call('getMessages', (error, messages) => {
        if(error) {
            throw new Error("error!");
        }
        onData(null, {messages});
    });
}

export default composeWithTracker(composer)(ChatList);