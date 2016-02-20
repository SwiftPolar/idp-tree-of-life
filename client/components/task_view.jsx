import React from 'react'
export const task_view = ({task}) => {
    notfound = () => {
        if(task instanceof Error)
        return(<div>
            {task.message}
        </div>);
    }
    return (<div>
        {notfound()}
        <h1>{task.title}</h1>
        <p>{task.content}</p>
    </div>);
};