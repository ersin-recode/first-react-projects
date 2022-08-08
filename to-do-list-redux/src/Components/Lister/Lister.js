import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { animateCompletedTasks, promiseFor } from '../../app/App';
import { setCurrListingTasksType } from './currListingTasksTypeSlice'
import Task from './Task/Task';



export default function Lister({ TaskData }) {

    const currListingTasksType = useSelector((state) => {
        return state.currListingTasksType.type.value
    })
    const force = useSelector((state) => {
        return state.currListingTasksType.type.force
    })
    const dispatch = useDispatch()
    const currListingTasks = TaskData[currListingTasksType];

    const onClickMenu = async (e, newmenu) => {
        const newMenu = newmenu || e.target.name
        if (newMenu == currListingTasksType) return;
        dispatch(setCurrListingTasksType({ value: newMenu, force: true })); //!re render lister!
        await promiseFor(0);
        animateCompletedTasks(TaskData[newMenu].filter(e => e.status));
    }

    const onClickDeleteCompletedTasks = () => {
        TaskData.deleteCompletedTasks();
        dispatch(setCurrListingTasksType({ value: currListingTasksType, force: true })); //!re render lister!
    }

    useEffect(() => {
        console.log('lister re-rendered')
    });

    useEffect(() => {
        setTimeout(() => {
            animateCompletedTasks(TaskData['allTasks'].filter(e => e.status));
        }, 20);
    }, []);

    return (
        <div className='Lister Comp'>
            <span>Lister</span>
            <div className="task-container" style={{ display: 'flex', flexDirection: 'column' }}>

                {currListingTasks.map(task => (
                    <Task key={task.id} TaskData={TaskData} thisTask={task} currListingTasksType={currListingTasksType} />
                ))}


            </div>

            <div className="nav" style={{ display: 'flex', gap: '4px' }}>

                <div>remainig: {TaskData.activeTasks.length}</div>
                <div>
                    <button name='allTasks' onClick={onClickMenu}>all</button>
                </div>
                <div>
                    <button name='activeTasks' onClick={onClickMenu}>active</button>
                </div>
                <div>
                    <button name='completedTasks' onClick={onClickMenu}>completed Tasks</button>
                </div>
                <div>
                    <button onClick={onClickDeleteCompletedTasks}>delete completed</button>
                </div>


            </div>

        </div>
    )
}
