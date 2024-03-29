// CompletedTasks.js

import React, { useState, useEffect } from "react";
import {  Link } from "react-router-dom";

const CompletedTasks = () => {
  // const location = useLocation();
  // const { completedTasks } = location.state;
  const [completedTasks, setCompletedTasks] = useState([]);

  // useEffect(() => {
  //   const loadedCompletedTasks =
  //     JSON.parse(localStorage.getItem("tasks"))?.filter(
  //       (task) => task.completed
  //     ) || [];
  //   setCompletedTasks(loadedCompletedTasks);
  // }, []);
  useEffect(() => {
    // Load completed tasks from localStorage
    const allTasks = JSON.parse(localStorage.getItem("completedtasks")) || [];
    // setCompletedTasks(allTasks.filter(task => task.completed));
    setCompletedTasks(allTasks);
    console.log(allTasks);
  }, []);
  const removeTask = (taskId) => {
    const updatedTasks = completedTasks.filter((task) => task.id !== taskId);
    setCompletedTasks(updatedTasks);
  };

  return (
    <div
      className="bg-yellow-100 "
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "700px",
        height: "500px",
      }}
    >
      <h1 className="text-2xl font-bold mb-4">Completed Tasks</h1>
      <div className="max-h-96 overflow-y-scroll items-center no-scrollbar">
      <ul>
        {completedTasks.map((task) => (
          <li key={task.id} className=" flex items-center justify-between p-3  w-96 ml-20p-3 my-2 bg-green-100 rounded shadow">
            <div>
            <div className="text-md font-serif font-semibold">{task.text}</div>
            {task.deadline && (
              <div className="ml-2 text-xs text-gray-500">
                Due by {new Date(task.deadline).toLocaleString()}
              </div>
            )}
            {task.completedDate && (
              <div className="ml-2 text-xs text-gray-500">
                Completed on {new Date(task.completedDate).toLocaleDateString()}
              </div>
            )}
            </div>
            
            <button
                className=" bg-red-500 hover:bg-red-600 text-white p-1 rounded"
                onClick={() => removeTask(task.id)}
              >
                Delete
              </button>
          </li>
        ))}
      </ul>
      </div>
      
      <Link to="/todo">
        <button className="mt-4 bg-blue-500 text-white p-2 rounded">
          Back to To-Do List
        </button>
      </Link>
    </div>
  );
};

export default CompletedTasks;
