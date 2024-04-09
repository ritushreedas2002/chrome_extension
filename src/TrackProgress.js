import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoChevronBackCircleOutline } from "react-icons/io5";

const Trackprogress = () => {
  const [completedTopics, setCompletedTopics] = useState([]);

  useEffect(() => {
    const storedTopics =
      JSON.parse(localStorage.getItem("completedTopics"));
    setCompletedTopics(storedTopics);
    console.log(completedTopics);
  }, []);

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
      <div className="absolute top-4 text-white text-center w-[60%]  ml-10">
        <div className=" text-4xl font-bold mb-12">Progress Tracker</div>
        <ul className="text-white text-left">
          {completedTopics.map((topic, index) => (
            <li key={index}>{topic}</li>
          ))}
        </ul>
      </div>
      <Link to="/">
        <button className="fixed left-4 bottom-4 bg-[#479d6b] hover:bg-[#31744d] text-white text-lg font-bold p-2 rounded-lg transition-transform duration-100 cursor-pointer hover:scale-110">
          <IoChevronBackCircleOutline />
        </button>
      </Link>
    </div>
  );
};
export default Trackprogress;
