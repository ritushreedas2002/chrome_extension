import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AddButton from "./assests/AddButton.png";
import { useNavigate } from "react-router-dom";
import ReminderModal from "./ReminderModal";
import { MdOutlineAlarm } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import backgroundImage from './assests/task2.png';

const ToDoList = () => {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [backlogtasks, setbacklogtasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [taskInput, setTaskInput] = useState("");
  const maxCharacters = 50;
  const [deadline, setDeadline] = useState("");
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Function to update tasks and backlog based on deadlines
    const updateTasksAndBacklog = () => {
      const now = new Date();
      let isTasksUpdated = false;

      // Filter tasks to find which are overdue
      const updatedTasks = tasks.filter((task) => {
        if (task.deadline && new Date(task.deadline) < now && !task.completed) {
          isTasksUpdated = true;
          return false; // This task is overdue, so don't include it in the updated tasks list
        }
        return true;
      });

      // If any tasks were overdue and filtered out, update tasks and backlog
      if (isTasksUpdated) {
        const newBacklogTasks = tasks.filter(
          (task) => !updatedTasks.includes(task)
        );

        // Update state
        setTasks(updatedTasks);
        setbacklogtasks((prevBacklog) => [...prevBacklog, ...newBacklogTasks]);

        // Update localStorage
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
        localStorage.setItem(
          "backlogTasks",
          JSON.stringify([
            ...JSON.parse(localStorage.getItem("backlogTasks") || "[]"),
            ...newBacklogTasks,
          ])
        );
      }
    };

    // Check tasks every minute
    const intervalId = setInterval(updateTasksAndBacklog, 60000);

    // Cleanup on component unmount
    return () => clearInterval(intervalId);
  }, [tasks]);

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
    const now = new Date();
    const loadedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const loadedCompletedTasks =
      JSON.parse(localStorage.getItem("completedTasks")) || [];
    const loadedBacklogTasks =
      JSON.parse(localStorage.getItem("backlogTasks")) || [];

    // Immediately move overdue tasks to backlog
    const [updatedTasks, newBacklogTasks] = loadedTasks.reduce(
      ([tasks, backlog], task) => {
        if (task.deadline && new Date(task.deadline) < now && !task.completed) {
          return [tasks, [...backlog, task]]; // Add to backlog if deadline is past
        } else {
          return [[...tasks, task], backlog]; // Keep in tasks otherwise
        }
      },
      [[], loadedBacklogTasks]
    ); // Start with empty arrays for tasks and backlog

    setTasks(updatedTasks);
    setCompletedTasks(loadedCompletedTasks);
    setbacklogtasks(newBacklogTasks);

    // Persist the updated separation into localStorage
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
    localStorage.setItem("backlogTasks", JSON.stringify(backlogtasks));
  }, [tasks, completedTasks, backlogtasks]);

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
      completionTime: null,
    };
    setTasks([...tasks, newTask]);
    setTaskInput("");
    setDeadline("");
    setShowModal(false); // Close the modal after adding a task
  };

  const toggleTaskCompletion = (taskId) => {
    const now = new Date();
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          completed: !task.completed,
          completionTime: now,
        };
      }
      return task;
    });

    let updatedCompletedTasks = [...completedTasks];

    if (updatedTasks.find((task) => task.id === taskId && task.completed)) {
      // Task was just completed, add to completedTasks if not already present
      if (!updatedCompletedTasks.find((task) => task.id === taskId)) {
        const completedTask = updatedTasks.find((task) => task.id === taskId);
        updatedCompletedTasks.push(completedTask);
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
      "completedTasks",
      JSON.stringify(updatedCompletedTasks)
    );
  };

  const showCompletedTasks = () => {
    // const completedTasks = tasks.filter(task => task.completed);
    navigate("/completed", { state: { completedTasks } });
  };

  const showBacklogTasks = () => {
    // const completedTasks = tasks.filter(task => task.completed);
    navigate("/backlog", { state: { backlogtasks } });
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
        {tasks.length === 0 ? (
          <div className=" w-[80%] mx-auto">
            <img src={backgroundImage} alt="Image not loaded" className="w-full h-full -mt-10 mb-2"/>
            <span className=" text-lg text-white font-semibold">
              Your To Do List is Empty, Start Adding Some & Keep Progressing
            </span>
          </div>
        ) : (
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
                {!task.completed && (
                  <button
                    onClick={() => {
                      setShowReminderModal(true);
                      setCurrentTaskId(task.id);
                    }}
                    className="ml-2 bg-red-500 text-2xl font-bold hover:bg-red-600 text-white py-1.5 px-3  rounded-md"
                  >
                    <MdOutlineAlarm />
                  </button>
                )}
              </li>
            ))}
            {showReminderModal && (
              <ReminderModal
                onSave={(email, dateTime) =>
                  setReminderForTask(email, dateTime)
                }
                onClose={() => setShowReminderModal(false)}
                taskId={currentTaskId}
                taskText={tasks.find((task) => task.id === currentTaskId)?.text}
              />
            )}
          </ul>
        )}
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
      <button
        className="fixed right-4 top-4 bg-[#479d6b] hover:bg-[#31744d] text-white text-base font-medium p-2 rounded-lg transition-transform duration-100 cursor-pointer hover:scale-110"
        onClick={showBacklogTasks}
      >
        Backlogs
      </button>
      <Link to="/">
        <button className="fixed left-4 bottom-4 bg-[#479d6b] hover:bg-[#31744d] text-white text-lg font-bold p-2 rounded-lg transition-transform duration-100 cursor-pointer hover:scale-110">
          <IoChevronBackCircleOutline />
        </button>
      </Link>

      {/* Modal for adding a new task */}
      {showModal && (
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
              required
            />
            <div className="text-xs text-right text-gray-500 mb-2">
              {maxCharacters - taskInput.length}
              {"/50"}
            </div>
            <input
              type="datetime-local"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="p-2 w-full border rounded mb-2"
              placeholder="Enter deadline..."
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
