import React from 'react'
export const task_list = ({tasks}) => (
    <div>
        This is a list of tasks
        <ul>
            {tasks.map(({_id, title}) => (
                <li key={_id}>
                    <a href={"/tasks/" + title}>{title}</a>
                </li>
            ))}
        </ul>
    </div>
);