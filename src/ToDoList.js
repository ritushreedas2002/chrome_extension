import React, { useState, useEffect } from "react";
import AddButton from "./assests/AddButton.png";
import { useNavigate } from 'react-router-dom';

const ToDoList = () => {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [taskInput, setTaskInput] = useState("");
  const [deadline, setDeadline] = useState("");
  const navigate = useNavigate();

  // useEffect(() => {
  //   // Load completed tasks separately
  //   const loadedCompletedTasks = JSON.parse(localStorage.getItem("completedTasks")) || [];
  //   setCompletedTasks(loadedCompletedTasks);
  // }, []);

  // useEffect(() => {
  //   // Save completed tasks to localStorage
  //   localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
  // }, [completedTasks]);

  useEffect(() => {
    const loadedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const loadedCompletedTasks = JSON.parse(localStorage.getItem("completedTasks")) || [];
    setTasks(loadedTasks);
    setCompletedTasks(loadedCompletedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
  }, [tasks, completedTasks]);

  const removeTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };
  
  // const removeCompletedTask = (taskId) => {
  //   const updatedCompletedTasks = completedTasks.filter((task) => task.id !== taskId);
  //   setCompletedTasks(updatedCompletedTasks);
  // };

  const addTask = () => {
    if (!taskInput.trim()) return;
    const newTask = {
      id: Date.now(),
      text: taskInput,
      completed: false,
      deadline: deadline || null,
    };
    setTasks([...tasks, newTask]);
    setTaskInput("");
    setDeadline("");
    setShowModal(false); // Close the modal after adding a task
  };

  // const toggleTaskCompletion = (taskId) => {
  //   const updatedTasks = tasks.map((task) => {
  //     if (task.id === taskId) {
  //       return { ...task, completed: !task.completed, completedDate: task.completed ? null : new Date() };
  //     }
  //     return task;
  //   });
  //   setTasks(updatedTasks);
  //   localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  // };
  // const toggleTaskCompletion = (taskId) => {
  //   const updatedTasks = tasks.map((task) => {
  //     if (task.id === taskId) {
  //       // Toggle the completed status and set completedDate if task is being completed
  //       const updatedTask = {
  //         ...task,
  //         completed: !task.completed,
  //       };
  //       if (!task.completed) updatedTask.completedDate = new Date().toISOString(); // Set completed date
  //       // setCompletedTasks([...completedTasks, updatedTask]);
  //       // localStorage.setItem("completedtasks", JSON.stringify(completedTasks));
  //       // console.log(completedTasks);
        
  //       return updatedTask;
  //     }
  //     return task;
  //   });
  //   setTasks(updatedTasks);
  //   localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    
  // };
  const toggleTaskCompletion = (taskId) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
  
    let updatedCompletedTasks = [...completedTasks];
  
    if (updatedTasks.find(task => task.id === taskId && task.completed)) {
      // Task was just completed, add to completedTasks if not already present
      if (!updatedCompletedTasks.find(task => task.id === taskId)) {
        const completedTask = updatedTasks.find(task => task.id === taskId);
        updatedCompletedTasks.push(completedTask);
        if (updatedCompletedTasks.length > 10) {
          updatedCompletedTasks.shift(); // Removes the first element from the array
        }
      }
    } else {
      // Task was just unchecked, remove from completedTasks if present
      updatedCompletedTasks = updatedCompletedTasks.filter(task => task.id !== taskId);
    }
  
    setTasks(updatedTasks);
    setCompletedTasks(updatedCompletedTasks);
    console.log(completedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    localStorage.setItem("completedtasks", JSON.stringify(updatedCompletedTasks))
  };

  const showCompletedTasks = () => {
    // const completedTasks = tasks.filter(task => task.completed);
    navigate('/completed', { state: { completedTasks } });
  };

  return (
    <div
      className="relative bg-yellow-100"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "700px",
        height: "500px",
      }}
    >
      <div className="absolute font-bold top-8 text-2xl mb-20">To Do Tasks</div>
      <div className="absolute inset-0 overflow-y-auto mt-24 p-4  no-scrollbar max-h-96">
        <ul>
          {tasks.map((task) => (
            <li
              key={task.id}
              className={`flex items-center justify-between p-3 my-2 w-[80%] ml-20 bg-white rounded shadow ${
                task.completed ? "bg-green-100" : "bg-gray-100"
              }`}
            >
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTaskCompletion(task.id)}
                className="form-checkbox h-5 w-5"
              />
              <span
                className={`ml-2 flex-1 ${
                  task.completed ? "line-through" : ""
                }`}
              >
                <div className=" text-base font-semibold">{task.text}</div>

                {task.deadline && (
                  <span className="ml-2 text-sm text-gray-500">
                    Due by {new Date(task.deadline).toLocaleString()}
                  </span>
                )}
              </span>
              <button
                className="ml-4 bg-red-500 hover:bg-red-600 text-white p-1 rounded"
                onClick={() => removeTask(task.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
      <img
        src={AddButton}
        alt="+ button"
        className="fixed left-8 top-11 w-12 h-12 transition-transform duration-100 cursor-pointer hover:scale-110"
        onClick={() => {
          setShowModal(true);
        }}
      />
      <button className="fixed right-8 top-12 bg-blue-500 text-white text-base font-semibold p-2 rounded-lg transition-transform duration-100 cursor-pointer hover:scale-110" onClick={showCompletedTasks}>
        Completed tasks
      </button>
      {/* Modal for adding a new task */}
      {showModal && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white p-6 rounded shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <input
              type="text"
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
              className="mr-2 p-2 w-full border rounded mb-2"
              placeholder="Add a new task..."
            />
            <input
              type="datetime-local"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="p-2 w-full border rounded mb-2"
            />
            <button
              onClick={addTask}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Add Task
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ToDoList;
