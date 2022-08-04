import React, { useEffect, useState } from 'react'
import "../styles/List.css"
import Task from './Task';

import "../styles/List.css"
import { promiseFor } from '../..';
export default function List({ app, TaskData }) {

    const [forceRender, setForceRender] = useState({ withDoneAnim: true });

    const [currListingMenu, setCurrListingMenu] = useState('allTasks');

    //completedTasks,activeTasks
    const currentTasks = TaskData[currListingMenu];


    const applyAnimToTasks = (arr) => {
        arr.forEach((el) => {
            el.ref.classList.remove('done-anim');
        })
        setTimeout(() => {
            arr.forEach((el) => {
                if (el.status) el.ref.classList.add('done-anim');
            })
        }, 0);
    }



    const onClickMenu = (e) => {
        const menu = e.target.name;
        if (currListingMenu == menu) return;
        setCurrListingMenu(menu);
        setForceRender(prev => { return { ...prev, withDoneAnim: true } })
    }


    const onClearCompletedTasks = (e) => {
        app.TaskData.deleteCompletedTasks();
        app.List.setForceRender((prev) => { return { ...prev, withDoneAnim: false } })
    }

    const [isSelectedAll, isSelectedActive, isSelectedCompleted] = [(currListingMenu == 'allTasks' ? 'selected' : ''), (currListingMenu == 'activeTasks' ? 'selected' : ''), (currListingMenu == 'completedTasks' ? 'selected' : '')]

    
    app.List = {
        setForceRender: setForceRender,
        currListingMenu: currListingMenu,
        currentTasks: currentTasks,
        applyAnimToTasks: applyAnimToTasks,

        Tasks: {}
    }

    useEffect(() => {
        if (forceRender.withDoneAnim) {
            applyAnimToTasks(currentTasks);
        }


    });
    return (
        <div className='List'>

            <div className="lister-container">
                {
                    currentTasks.map(task => <Task key={task.id} task={task} app={app} />)
                }
            </div>

            <div className="nav">

                <div>remainig: {app.TaskData.activeTasks.length}</div>
                <div >
                    <button name='allTasks' onClick={onClickMenu} className={`menu ${isSelectedAll}`}>all</button>
                </div>
                <div >
                    <button name='activeTasks' onClick={onClickMenu} className={`menu ${isSelectedActive}`}>active</button>
                </div>
                <div >
                    <button name='completedTasks' onClick={onClickMenu} className={`menu ${isSelectedCompleted}`}>completed</button>
                </div>

                {app.TaskData.completedTasks.length > 0 && <div  >
                    <button onClick={onClearCompletedTasks} className="menu">clear completed</button></div>}


            </div>


        </div >
    )
}
