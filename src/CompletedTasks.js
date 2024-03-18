// CompletedTasks.js

import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

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
    const allTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setCompletedTasks(allTasks.filter(task => task.completed));
  }, []);

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
      <ul>
        {completedTasks.map((task) => (
          <li key={task.id} className="p-3 my-2 bg-green-100 rounded shadow">
            {task.text}
            {task.deadline && (
              <div className="ml-2 text-sm text-gray-500">
                Due by {new Date(task.deadline).toLocaleString()}
              </div>
            )}
            {task.completedDate && (
              <div className="ml-2 text-sm text-gray-500">
                Completed on {new Date(task.completedDate).toLocaleDateString()}
              </div>
            )}
          </li>
        ))}
      </ul>
      <Link to="/todo">
        <button className="mt-4 bg-blue-500 text-white p-2 rounded">
          Back to To-Do List
        </button>
      </Link>
    </div>
  );
};

export default CompletedTasks;
