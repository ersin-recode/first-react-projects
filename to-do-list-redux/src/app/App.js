import Form from "../Components/Form/Form";
import Lister from "../Components/Lister/Lister";




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
  activeTasks: [],
  completedTasks: [],
  getUniqId: function () {
    return this.allTasks.at(-1) ? this.allTasks.at(-1).id + 1 : 1
  },
  addTask: function (task) {
    const id = this.getUniqId();
    this.allTasks.push(
      {
        id: id,
        task: task,
        status: false
      }
    )

    this.setTaskArraysAfterUpdate();
    return id;
  },
  deleteTaskById: function (id) {
    this.allTasks = this.allTasks.filter(task => task.id != id);
    this.setTaskArraysAfterUpdate();
  },
  deleteCompletedTasks: function () {
    this.allTasks = this.allTasks.filter(task => !task.status);
    this.setTaskArraysAfterUpdate();
  },
  completeTaskById: function (id) {
    const targetTask = this.allTasks.find(task => task.id == id);
    targetTask.status = true;
    this.setTaskArraysAfterUpdate();
  },
  completeAllTasks: function () {
    this.allTasks.forEach(task => task.status = true);
    this.setTaskArraysAfterUpdate();
  },
  setTaskArraysAfterUpdate: function () {
    //!when allTask is updated we need update other arrays (active,completed etc)
    this.activeTasks = this.allTasks.filter(task => !task.status);
    this.completedTasks = this.allTasks.filter(task => task.status);
  }

}
TaskData.setTaskArraysAfterUpdate();

function App() {
  return (
    <div className="App Comp">
      <span>App</span>
      <Form TaskData={TaskData} />
      <Lister TaskData={TaskData} />
    </div>
  );
}

export default App;


export function promiseFor(time) {

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('')
    }, time);
  })


}

export const animTime = 2000;

export const animateCompletedTasks = async function (tasks) {
  tasks.forEach(task => {
    task.ref.style.animation = '';
  })
  await promiseFor(20);
  tasks.forEach(task => {
    task.ref.style.animation = 'done-anim 2s cubic-bezier(0.075, 0.82, 0.165, 1)';

  })

}