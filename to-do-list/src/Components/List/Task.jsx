import React, { useEffect, useRef, useState } from 'react'
import { animTime, promiseFor } from '../..';

import { MdDoneOutline } from 'react-icons/md';
import "../styles/Task.css"
export default function Task({ app, task }) {

    const [isDone, setIsDone] = useState(task.status);

    const onDoneClick = async (e) => {
        if (task.status) return;
        app.TaskData.completeTaskById(task.id);
        setIsDone(true);
        await promiseFor(animTime);

        //!to change remaining task
        app.List.setForceRender((prev) => { return { ...prev, withDoneAnim: false } })
    }

    const onDeleteTaskClick = (e) => {
        app.TaskData.deleteTaskById(task.id);
        app.List.setForceRender((prev) => { return { ...prev, withDoneAnim: false } })
    }

    const doneLineRef = useRef(null);

    app.List.Tasks[task.id] = {
        setIsDone: setIsDone
    }
    useEffect(() => {
        task.ref = doneLineRef.current;
    }, []);

    return (
        <div className='Task'>

            <div className="done-btn">
                <button onClick={onDoneClick}><MdDoneOutline /></button>
            </div>
            <div className="task-text">
                <div className="text">{task.task}
                    <div ref={doneLineRef} className={`done-line ${isDone ? 'done done-anim' : ''}`}></div>
                </div>
            </div>

            <div className="delete">
                <button onClick={onDeleteTaskClick}>X</button>
            </div>
        </div>
    )
}
