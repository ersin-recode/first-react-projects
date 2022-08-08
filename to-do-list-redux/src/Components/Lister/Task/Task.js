import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { animateCompletedTasks, animTime, promiseFor } from '../../../app/App';
import { setCurrListingTasksType } from '../currListingTasksTypeSlice';






export default function Task({ TaskData, thisTask, currListingTasksType }) {

    const taskRef = useRef(null);
    const [taskStatus, setTaskStatus] = useState(thisTask.status);
    const dispatch = useDispatch()

    const onDoneTaskClick = async function (e) {
        if (thisTask.status) return;
        TaskData.completeTaskById(thisTask.id);

        animateCompletedTasks([thisTask])
        await promiseFor(animTime);
        //!ders al.. lister her turlu re-render ediliyor....
        // if (currListingTasksType == 'allTask') {
        //     console.log('asdasd213')
        //     setTaskStatus(true); //!re-render just this compo
        // }
        // else {
        //     dispatch(setCurrListingTasksType({ value: currListingTasksType, force: true })); //!re render lister.. so this comp either
        // }
        dispatch(setCurrListingTasksType({ value: currListingTasksType, force: true })); //!re render lister!

    }
    const onDeleteTaskClick = (e) => {
        TaskData.deleteTaskById(thisTask.id);
        dispatch(setCurrListingTasksType({ value: currListingTasksType, force: true }));
    }

    useEffect(() => {
        thisTask.ref = taskRef.current;
    });
    return (
        <div className='Task Comp' style={{display:'flex'}}>
            <span>Task</span>
            <div className="done-btn" onClick={onDoneTaskClick}>done</div>
            <div ref={taskRef} className={`task-text ${thisTask.status ? 'completed' : 'active'}`}>{thisTask.task}</div>
            <div className="delete" onClick={onDeleteTaskClick}>delete</div>
        </div>
    )
}
