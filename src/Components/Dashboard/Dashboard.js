// Dashboard.js
import React, { useState } from "react";
import complete from "./complete.png";
import incomplete from "./incomplete.png";

const Dashboard = () => {
  const [tasks, setTasks] = useState([
    { name: "Task 1", time: "10:00 AM", isComplete: false },
    { name: "Task 2", time: "02:00 PM", isComplete: false },
    // Add more tasks as needed
  ]);

  const [taskName, setTaskName] = useState("");
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [ampm, setAmPm] = useState("AM");
  const [editTaskIndex, setEditTaskIndex] = useState(null);

  const addTask = () => {
    if (taskName) {
      const formattedHours = hours < 10 ? `0${hours}` : hours;
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

      const newTaskTime = `${formattedHours}:${formattedMinutes} ${ampm}`;

      if (editTaskIndex !== null) {
        // If editing an existing task
        const updatedTasks = [...tasks];
        updatedTasks[editTaskIndex] = {
          name: taskName,
          time: newTaskTime,
          isComplete: updatedTasks[editTaskIndex].isComplete,
        };
        setTasks(updatedTasks);
        setEditTaskIndex(null);
      } else {
        // If adding a new task
        setTasks([
          ...tasks,
          { name: taskName, time: newTaskTime, isComplete: false },
        ]);
      }

      // Clear input fields after adding/updating task
      setTaskName("");
      setHours(0);
      setMinutes(0);
      setAmPm("AM");
    }
  };

  const editTask = (index) => {
    const taskToEdit = tasks[index];
    setTaskName(taskToEdit.name);
    const [editedHours, editedMinutes] = taskToEdit.time
      .split(" ")[0]
      .split(":");
    setHours(parseInt(editedHours, 10));
    setMinutes(parseInt(editedMinutes, 10));
    setAmPm(taskToEdit.time.split(" ")[1]);
    setEditTaskIndex(index);
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const toggleComplete = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].isComplete = !updatedTasks[index].isComplete;
    setTasks(updatedTasks);
  };

  const handleHourChange = (e) => {
    const newHour = parseInt(e.target.value, 10) || 0;
    setHours(Math.min(Math.max(newHour, 1), 12));
  };

  const handleMinuteChange = (e) => {
    const newMinute = parseInt(e.target.value, 10) || 0;
    setMinutes(Math.min(Math.max(newMinute, 0), 59));
  };

  const handleAmPmChange = (e) => {
    setAmPm(e.target.value);
  };

  return (
    <div className="container mx-auto  p-4 bg-gray-100 rounded-md">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Task Name
        </label>
        <input
          type="text"
          className="mt-1 p-2 border rounded-md w-full"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Task Time
        </label>
        <div className="flex space-x-2 items-center">
          <div className="relative">
            <input
              type="number"
              className="p-2 border rounded-md w-14 text-center"
              value={hours}
              onChange={handleHourChange}
              min="1"
              max="12"
            />
          </div>
          <span className="p-2">:</span>
          <div className="relative">
            <input
              type="number"
              className="p-2 border rounded-md w-14 text-center"
              value={minutes}
              onChange={handleMinuteChange}
              min="0"
              max="59"
            />
          </div>
          <select
            className="p-2 border rounded-md"
            value={ampm}
            onChange={handleAmPmChange}
          >
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
        </div>
      </div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
        onClick={addTask}
      >
        {editTaskIndex !== null ? "Update Task" : "Add Task"}
      </button>
      <ul className="m-2 mt-6">
        {tasks.map((task, index) => (
          <li key={index} className="mb-2 bg-white p-4 rounded-md shadow-md">
            <div className="flex justify-between">
            <button
                className={`mr-2 text-${task.isComplete ? "green" : "red"}-500`}
                onClick={() => toggleComplete(index)}
              >
                <img
                  className=" h-[3vh]"
                  src={task.isComplete ? complete : incomplete}
                ></img>
              </button>
              <div>
                {task.name} - {task.time}
              </div>
              
              <div>
                <button
                  className="px-2 ml-2 border-blue-800 text-blue-800 border-2 rounded-md text-blue-500"
                  onClick={() => editTask(index)}
                >
                  Update
                </button>
                <button
                  className="px-2 ml-2 border-red-500 text-red-500 border-2 rounded-md"
                  onClick={() => deleteTask(index)}
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
