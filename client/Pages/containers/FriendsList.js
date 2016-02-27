import {composeWithTracker} from 'react-komposer'
import FriendsList from '../components/FriendsList.jsx';

function composer(props, onData) {
    Meteor.call('getFriendsList', (error, friends) => {
        if(error) {
            throw new Error("error!");
        }
        onData(null, {friends});
    });
}

export default composeWithTracker(composer)(FriendsList);