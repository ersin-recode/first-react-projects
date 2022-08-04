import React, { useState } from 'react'
import { animTime, promiseFor } from '../..';
import List from '../List/List';
import "../styles/Form.css"
import { MdDoneAll } from 'react-icons/md';

export default function Form({ app }) {

    const [inputVal, setinputVal] = useState('');

    const onInputChange = (e) => {
        setinputVal(e.target.value)
    }
    const onInputKeyDown = (e) => {
        if (e.target.value == '' || e.key != 'Enter') return;
        setinputVal('');
        app.TaskData.setNewTask(e.target.value);
        app.List.setForceRender(prev => { return { ...prev, withDoneAnim: false } })
    }
    const onDoneAllButton = async (e) => {
        if (app.TaskData.activeTasks.length == 0) return;
        if (app.List.currListingMenu != "completedTasks") {

            app.List.currentTasks.forEach(task => {
                if (!task.status) {
                    app.List.Tasks[task.id].setIsDone(true);
                }
            })
            await promiseFor(600);
        }
        app.TaskData.completeAllActiveTasks();
        app.List.setForceRender((prev) => { return { ...prev, withDoneAnim: false } })
    }

    return (
        <div className='Form'>

            <div className='done-all-btn'>
                <button onClick={onDoneAllButton}><MdDoneAll /></button>
            </div>
            <div className='add-task-input'>
                <input type="text" value={inputVal} onChange={onInputChange} onKeyDown={onInputKeyDown} placeholder={'add '} />
            </div>

        </div>
    )
}
