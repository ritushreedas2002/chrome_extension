import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
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
        <Link to="/revise">
          <button className="p-4 m-4 w-48 text-xl font-semibold bg-blue-500 text-white rounded-lg">
            Revise Concepts
          </button>
        </Link>
        <Link to="/about">
          <button className="p-4 m-4 w-48 bg-blue-500 text-xl font-semibold text-white rounded-lg">
            Take Quiz
          </button>
        </Link>
        <Link to="/dailychallenge">
          <button className="p-4 m-4 w-48 text-xl font-semibold bg-blue-500 text-white rounded-lg">
            Daily Challenge
          </button>
        </Link>
        <Link to="/about">
          <button className="p-4 m-4 w-48 bg-blue-500 text-xl font-semibold text-white rounded-lg">
            Track Progress
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
