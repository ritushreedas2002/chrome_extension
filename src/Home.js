import React from "react";
import { Link, useNavigate } from "react-router-dom";
import dsa from "./dsa.json"
import { useIndex } from './Context/Context';
const Home = () => {
  // const handleReviseClick = () => {
  //   // Send a message to the background script to clear the badge
  //   chrome.runtime.sendMessage({ action: 'clearBadge' })
  
  // };
  let navigate = useNavigate();
  const { incrementIndex } = useIndex();

  const handleReviseClick = () => {
    incrementIndex();
    navigate("/revise");
  };
  
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "700px",
        height: "500px",
      }}
    >
      <div className="absolute font-bold top-12 text-2xl mb-20">
        DSA Revision Buddy
      </div>

      <div
        className="flex flex-wrap justify-center items-center"
        style={{ maxWidth: "70%" }}
      >
       
          <button className="p-4 m-4 w-48 text-xl font-semibold bg-blue-500 text-white rounded-lg"onClick={handleReviseClick}>
            Revise Concepts
          </button>
          
        <Link to="/quiz">
          <button className="p-4 m-4 w-48 bg-blue-500 text-xl font-semibold text-white rounded-lg">
            Take Quiz
          </button>
        </Link>
        <Link to="/dailychallenge">
          <button className="p-4 m-4 w-48 text-xl font-semibold bg-blue-500 text-white rounded-lg">
            Daily Challenge
          </button>
        </Link>
        <Link to="/trackprogress">
          <button className="p-4 m-4 w-48 bg-blue-500 text-xl font-semibold text-white rounded-lg">
            Track Progress
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
