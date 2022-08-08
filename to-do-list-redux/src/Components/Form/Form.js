import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { animateCompletedTasks, animTime, promiseFor } from '../../app/App';
import currListingTasksTypeSlice, { setCurrListingTasksType } from '../Lister/currListingTasksTypeSlice';


const placeHolder = 'type a task and press enter';


export default function Form({ TaskData }) {

    let currListingTasksType;
    useSelector((state) => {                                               //!getting current state value
        currListingTasksType = state.currListingTasksType.type.value
    })
    // let currListingTasksType2 = useSelector((state) => {  //!SETTING state to THIS COMPONENT!!!
    //     return state.currListingTasksType.type.value
    // })
    const dispatch = useDispatch();

    const [inputVal, setinputVal] = useState('');
    const onDoneAllTaskClick = async (e) => {
        if (TaskData.activeTasks.length == 0) return;

        if (currListingTasksType != 'completed') {
            animateCompletedTasks(TaskData.activeTasks)
            await (promiseFor(animTime));
        }
        TaskData.completeAllTasks();
        dispatch(setCurrListingTasksType({ value: currListingTasksType, force: true }));

    }
    const onAddTaskClick = () => {
        TaskData.addTask(inputVal);
        dispatch(setCurrListingTasksType({ value: currListingTasksType, force: true }));
        setinputVal('');
    }
    const onKeyDown = (e) => {
        if (e.key != "Enter" || e.target.value == '') return
        onAddTaskClick(e.target.value);
    }
    useEffect(() => {
        console.log('form re-rendered')
    });

    return (
        <div className='Form Comp' style={{ display: 'flex' }}>
            <span>Comp</span>
            <div className="done-all-task">
                <button onClick={onDoneAllTaskClick}>done alll</button>
            </div>
            <div className="task-input">
                <input type="text" placeholder={placeHolder} value={inputVal} onKeyDown={onKeyDown} onChange={(e) => setinputVal(e.target.value)} />
            </div>
            <div className="add">
                <button onClick={onAddTaskClick}>add</button>
            </div>
        </div>
    )
}
