import {composeWithTracker} from 'react-komposer'
import Profile from './../components/Profile.jsx';

function composer(props, onData) {
    Meteor.call('getUserProfile', props.params.username, (error, result) => {
        if(error) throw new Error("404 Profile Not Found!");
        onData(null, {data: result});
    });
}

export default composeWithTracker(composer)(Profile);