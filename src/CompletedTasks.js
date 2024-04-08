import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import { MdOutlineDelete } from "react-icons/md";

const CompletedTasks = () => {
  // const location = useLocation();
  // const { completedTasks } = location.state;
  const [completedTasks, setCompletedTasks] = useState([]);
  useEffect(() => {
    // Load completed tasks from localStorage
    const allTasks = JSON.parse(localStorage.getItem("completedTasks")) || [];
    // setCompletedTasks(allTasks.filter(task => task.completed));
    setCompletedTasks(allTasks);
    console.log(allTasks);
  }, []);

  const removeTask = (taskId) => {
    const updatedTasks = completedTasks.filter((task) => task.id !== taskId);
    setCompletedTasks(updatedTasks);
    localStorage.setItem("completedTasks", JSON.stringify(updatedTasks));
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
        Completed Tasks
      </h1>
      <div className="absolute inset-0 overflow-y-auto mt-20 p-4  no-scrollbar max-h-96">
        <ul>
          {completedTasks.map((task) => (
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
                  {task.completed && (
                    <div className="ml-2 text-xs text-gray-700">
                      Completed on{" "}
                      {new Date(task.completionTime).toLocaleDateString()}
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

export default CompletedTasks;
