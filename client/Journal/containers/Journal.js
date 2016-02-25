import {composeWithTracker} from 'react-komposer'
import ViewJournal from '../components/Journal.jsx';

function composer(props, onData) {
    const handle = Meteor.subscribe('getAllJournal');
    if(handle.ready()) {
        let journal = Journal.find({}, {sort: {date: -1}}).fetch();

        if(!journal) {
            journal = new Error("404 Topic Not Found!");
        }

        onData(null, {journal});
    }
}

export default composeWithTracker(composer)(ViewJournal);