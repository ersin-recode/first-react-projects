import { useState } from "react";
import Form from "./Components/Form/Form";
import List from "./Components/List/List";
import "./Components/styles/App.css"


const TaskData = {
  allTasks: [
    {
      id: 1,
      task: 'todo1',
      status: false
    },
    {
      id: 2,
      task: 'todo2',
      status: true
    },
    {
      id: 3,
      task: 'todo3',
      status: true
    },
    {
      id: 4,
      task: 'todo4',
      status: false
    }
  ],
  completedTasks: undefined,
  activeTasks: undefined,
  getUniqId: function () {
    return this.allTasks.length > 0 ? this.allTasks.at(-1).id + 1 : 1
  },
  completeTaskById: function (id) {
    const index = this.allTasks.findIndex(task => task.id == id);
    this.allTasks[index].status = true;
    this.setCompleteAndActive();
  },
  deleteTaskById: function (id) {
    const index = this.allTasks.findIndex(task => task.id == id);
    this.allTasks[index].delete = true;
    this.allTasks = this.allTasks.filter(task => !task.delete);
    this.setCompleteAndActive();
  },
  deleteCompletedTasks: function () {
    this.allTasks = [...this.activeTasks];
    this.setCompleteAndActive();
  },
  completeAllActiveTasks: function () {
    this.activeTasks.forEach(task => task.status = true);
    this.setCompleteAndActive();
  }
  ,
  setNewTask: function (todo) {
    this.allTasks.push(
      {
        id: this.getUniqId(),
        task: todo,
        status: false
      }
    )
    this.setCompleteAndActive();
  },
  setCompleteAndActive: function () {
    this.completedTasks = this.allTasks.filter(task => task.status);
    this.activeTasks = this.allTasks.filter(task => !task.status);
  }

}

TaskData.setCompleteAndActive();

function App() {

  let app = {
    TaskData: TaskData,
    Form: undefined,
    List: undefined
  };

  return (
    <div className={`App`}>
      <div className="container">
        <Form app={app} TaskData={TaskData} />
        <List app={app} TaskData={TaskData} />
      </div>
    </div>
  );
}

export default App;
