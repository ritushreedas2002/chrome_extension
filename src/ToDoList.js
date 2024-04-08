import React, { useState, useEffect } from "react";
import AddButton from "./assests/AddButton.png";
import { useNavigate } from "react-router-dom";
import ReminderModal from "./ReminderModal";
import { MdOutlineAlarm } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";

const ToDoList = () => {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [taskInput, setTaskInput] = useState("");
  const maxCharacters = 50;
  const [deadline, setDeadline] = useState("");
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState(null);
  const navigate = useNavigate();

  const setReminderForTask = (email, dateTime) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === currentTaskId) {
        return { ...task, reminderEmail: email, reminderDateTime: dateTime };
      }
      return task;
    });

    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  useEffect(() => {
    const loadedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const loadedCompletedTasks =
      JSON.parse(localStorage.getItem("completedTasks")) || [];
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

  const toggleTaskCompletion = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });

    let updatedCompletedTasks = [...completedTasks];

    if (updatedTasks.find((task) => task.id === taskId && task.completed)) {
      // Task was just completed, add to completedTasks if not already present
      if (!updatedCompletedTasks.find((task) => task.id === taskId)) {
        const completedTask = updatedTasks.find((task) => task.id === taskId);
        updatedCompletedTasks.push(completedTask);
        if (updatedCompletedTasks.length > 10) {
          updatedCompletedTasks.shift(); // Removes the first element from the array
        }
      }
    } else {
      // Task was just unchecked, remove from completedTasks if present
      updatedCompletedTasks = updatedCompletedTasks.filter(
        (task) => task.id !== taskId
      );
    }

    setTasks(updatedTasks);
    setCompletedTasks(updatedCompletedTasks);
    console.log(completedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    localStorage.setItem(
      "completedtasks",
      JSON.stringify(updatedCompletedTasks)
    );
  };

  const showCompletedTasks = () => {
    // const completedTasks = tasks.filter(task => task.completed);
    navigate("/completed", { state: { completedTasks } });
  };

  const handleTaskInputChange = (e) => {
    const inputText = e.target.value;
    if (inputText.length <= maxCharacters) {
      setTaskInput(inputText);
    }
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
      <div className="absolute font-bold text-white top-8 text-3xl mb-20">
        To Do Tasks
      </div>
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
                className="ml-4 bg-red-500 text-2xl font-bold hover:bg-red-600 text-white py-1.5 px-3 rounded-md"
                onClick={() => removeTask(task.id)}
              >
                <MdOutlineDelete />
              </button>
              <button
                onClick={() => {
                  setShowReminderModal(true);
                  setCurrentTaskId(task.id);
                }}
                className="ml-2 bg-red-500 text-2xl font-bold hover:bg-red-600 text-white py-1.5 px-3  rounded-md"
              >
                <MdOutlineAlarm />
              </button>
            </li>
          ))}
          {showReminderModal && (
            <ReminderModal
              onSave={(email, dateTime) => setReminderForTask(email, dateTime)}
              onClose={() => setShowReminderModal(false)}
              taskId={currentTaskId}
              taskText={tasks.find((task) => task.id === currentTaskId)?.text}
            />
          )}
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
      <button
        className="fixed right-28 top-4 bg-[#479d6b] hover:bg-[#31744d] text-white text-base font-medium p-2 rounded-lg transition-transform duration-100 cursor-pointer hover:scale-110"
        onClick={showCompletedTasks}
      >
        Completed
      </button>
      <button className="fixed right-4 top-4 bg-[#479d6b] hover:bg-[#31744d] text-white text-base font-medium p-2 rounded-lg transition-transform duration-100 cursor-pointer hover:scale-110">
        Backlogs
      </button>
      {/* Modal for adding a new task */}
      {showModal && (
        // <div
        //   className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center"
        //   onClick={() => setShowModal(false)}
        // >
        //   <div
        //     className="bg-white p-6 rounded shadow-lg"
        //     onClick={(e) => e.stopPropagation()}
        //   >
        //     <input
        //       type="text"
        //       value={taskInput}
        //       onChange={(e) => setTaskInput(e.target.value)}
        //       className="mr-2 p-2 w-full border rounded mb-2"
        //       placeholder="Add a new task..."
        //     />
        //     <input
        //       type="datetime-local"
        //       value={deadline}
        //       onChange={(e) => setDeadline(e.target.value)}
        //       className="p-2 w-full border rounded mb-2"
        //     />
        //     <button
        //       onClick={addTask}
        //       className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        //     >
        //       Add Task
        //     </button>
        //   </div>
        // </div>
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-[#e6ecda] p-6 pb-3 rounded-2xl shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <input
              type="text"
              value={taskInput}
              onChange={handleTaskInputChange}
              className="mr-2 p-2 text-base w-full border rounded mb-1"
              placeholder="Add a new task..."
              maxLength={maxCharacters}
            />
            <div className="text-xs text-right text-gray-500 mb-2">
              {maxCharacters - taskInput.length}{"/50"} 
            </div>
            <input
              type="datetime-local"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="p-2 w-full border rounded mb-4"
            />
            <button
              onClick={addTask}
              className="px-4 py-2 bg-[#1d84b5] text-white font-semibold rounded-lg hover:bg-[#1d85b5dc]"
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
