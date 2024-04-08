// CompletedTasks.js

import React, { useState, useEffect } from "react";
import {  Link } from "react-router-dom";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import { MdOutlineDelete } from "react-icons/md";

const Backlog = () => {
  const [backlogTasks, setbacklogTasks] = useState([]);

  useEffect(() => {
    // Load completed tasks from localStorage
    const allTasks = JSON.parse(localStorage.getItem("backlogTasks")) || [];
    // setCompletedTasks(allTasks.filter(task => task.completed));
    setbacklogTasks(allTasks);
    console.log(allTasks);
  }, []);
  const removeTask = (taskId) => {
    const updatedTasks = backlogTasks.filter((task) => task.id !== taskId);
    setbacklogTasks(updatedTasks);
    localStorage.setItem("backlogTasks", JSON.stringify(updatedTasks));
  };

  return (
    <div
      className="relative bg-[#0A2342]"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "700px",
        height: "500px",
      }}
    >
      <h1 className="absolute font-bold text-white top-8 text-3xl mb-20">
        Backlog Tasks
      </h1>
      <div className="absolute inset-0 overflow-y-auto mt-20 p-4  no-scrollbar max-h-96">
        <ul>
          {backlogTasks.map((task) => (
            <li
              key={task.id}
              className=" flex items-center justify-center p-3 w-[80%] ml-20 my-2 bg-green-100 rounded shadow"
            >
              <div className=" w-[88%]">
                <div className="text-base text-center font-semibold">
                  {task.text}
                </div>
                <div className=" flex justify-center">
                  {task.deadline && (
                    <div className="ml-2 mr-4 text-xs text-gray-700">
                      Due by {new Date(task.deadline).toLocaleString()}
                    </div>
                  )}
                </div>
              </div>

              <button
                className=" ml-4 bg-red-500 justify-end text-2xl font-bold hover:bg-red-600 text-white py-1.5 px-3 rounded-md"
                onClick={() => removeTask(task.id)}
              >
                <MdOutlineDelete />
              </button>
            </li>
          ))}
        </ul>
      </div>
      <Link to="/todo">
        <button className="fixed left-4 bottom-4 bg-[#479d6b] hover:bg-[#31744d] text-white text-lg font-bold p-2 rounded-lg transition-transform duration-100 cursor-pointer hover:scale-110">
          <IoChevronBackCircleOutline />
        </button>
      </Link>
    </div>
  );
};

export default Backlog;
