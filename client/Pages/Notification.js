import {composeWithTracker} from 'react-komposer'
import Notification from './Notification.jsx';

function composer(props, onData) {
    let handle = Meteor.subscribe('getUserNotifications');
    if(handle.ready()) {
        let notifications = Notifications.find({}, {sort: {date: -1}}).fetch();

        if(!notifications) {
            notifications = new Error("404 Not Found!");
        }

        onData(null, {notifications});
    }
}

export default composeWithTracker(composer)(Notification);