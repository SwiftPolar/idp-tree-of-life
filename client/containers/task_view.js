import {composeWithTracker} from 'react-komposer'
import {task_view as task} from '../components/task_view.jsx'

function composer(props, onData) {
    const handle = Meteor.subscribe('task', props.params.id);
    if(handle.ready()) {
        let task = Tasks.findOne({_id: props.params.id});

        if(!task) {
            task = new Error("404 Task Not Found!");
        }

        onData(null, {task});
    }
}

export default composeWithTracker(composer)(task);