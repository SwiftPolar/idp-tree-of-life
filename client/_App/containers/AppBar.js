import {composeWithTracker} from 'react-komposer'
import AppBar from '../components/AppBar.jsx';
import Loading from '../AppBarLoading.jsx';

function composer(props, onData) {
    const handle = Meteor.subscribe('haveNotifications');
    if(handle.ready()) {
        let latest = Notifications.findOne({});
        onData(null, {latest});
    }
}

export default composeWithTracker(composer, Loading)(AppBar);