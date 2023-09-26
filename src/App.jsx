import React, { useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header/Header'
import Tasks from './components/Tasks/Tasks'


// Defining the localStorage Key to save & get tasks from localStorage
const LOCAL_STORAGE_KEY = "todo:savedTasks"

function App() {

  const [tasks, setTasks] = useState([]);

  function setTasksAndSave(newTasks) {
    setTasks(newTasks);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTasks));
  }

  function loadSavedTasks() {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    console.log(saved);
    if (saved) {
      setTasks(JSON.parse(saved))
    }
  }

  function getDate() {
    const date = new Date();
    const [day, month, year, hour, minute] = [
      date.getDate(),
      date.getMonth(),
      date.getFullYear(),
      date.getHours(),
      date.getMinutes(),
    ];
    // Add leading zeros if necessary
    var formattedHours = hour < 10 ? '0' + hour : hour;
    var formattedMinutes = minute < 10 ? '0' + minute : minute;
    const taskTime = `${formattedHours}:${formattedMinutes}`;
    const taskDate = `${day}/${month}/${year}`;
    return { taskTime, taskDate };
  }

  useEffect(() => {
    loadSavedTasks();
  }, [])

  function addTask(taskTitle) {
    setTasksAndSave([
      ...tasks,
      {
        id: crypto.randomUUID(),
        title: taskTitle,
        isCompleted: false,
        time: getDate().taskTime,
        date: getDate().taskDate,
      }
    ])
  }

  function toggleTaskCompletedById(taskId) {
    const newTasks = tasks.map(task => {
      if (task.id === taskId) {
        return {
          ...task,
          isCompleted: !task.isCompleted
        }
      }
      return task;
    });
    setTasksAndSave(newTasks);
  }

  function deleteTaskById(taskId) {
    const newTasks = tasks.filter(task => task.id !== taskId);
    setTasksAndSave(newTasks);
  }

  return (
    <>
      <Header onAddTask={addTask} />
      <Tasks tasks={tasks} onComplete={toggleTaskCompletedById} onDelete={deleteTaskById} />

      <p className='developer'>© Made with 💗 by Mojtaba Mohseni</p>
    </>
  )
}

export default App
