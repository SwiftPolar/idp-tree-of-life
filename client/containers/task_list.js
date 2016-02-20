import {composeWithTracker} from 'react-komposer'
import {task_list as list} from '../components/task_list.jsx'

function composer(props, onData) {
    const handle = Meteor.subscribe('tasks');
    if(handle.ready()) {
        const tasks = Tasks.find({}, {sort: {_id: 1}}).fetch();
        onData(null, {tasks});
    }
}

export default composeWithTracker(composer)(list);