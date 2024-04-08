import React from "react";
import { Link } from "react-router-dom";
import backgroundImage from './assests/hillybg.png';

const Home = () => {
  return (
    <div
      className="relative bg-[#0A2342]"
      style={{
        alignItems: "center",
        justifyContent: "center",
        width: "700px",
        height: "500px",
      }}
    >
      <div className="flex ">
        <div className="text-white text-center  mt-[20%] w-[60%]  ml-10">
          <div className="  text-5xl font-bold mb-8">AlgoAce</div>
          <div className=" text-xl font-semibold">
            Revise Today, To Ace Your Interviews Tomorrow
          </div>
        </div>
        <div
          className="flex flex-wrap z-10 justify-center items-center w-[40%] mt-14"
        >
          <Link to="/revise">
            <button className="p-4 my-2 w-48 text-xl font-semibold bg-[#479d6b] hover:bg-[#31744d] text-white rounded-3xl">
              Revise Concepts
            </button>
          </Link>
          <Link to="/quiz">
            <button className="p-4 my-2 w-48 bg-[#479d6b] hover:bg-[#31744d] text-xl font-semibold text-white rounded-3xl">
              Take Quiz
            </button>
          </Link>
          <Link to="/dailychallenge">
            <button className="p-4 my-2 w-48 text-xl font-semibold bg-[#479d6b] hover:bg-[#31744d] text-white rounded-3xl">
              Daily Challenge
            </button>
          </Link>
          <Link to="/trackprogress">
            <button className="p-4 my-2 w-48 bg-[#479d6b] hover:bg-[#31744d] text-xl font-semibold text-white rounded-3xl">
              Track Progress
            </button>
          </Link>
          <Link to="/todo">
            <button className="p-4 my-2 w-48 bg-[#479d6b] hover:bg-[#31744d] text-xl font-semibold text-white rounded-3xl">
              To Do Tasks
            </button>
          </Link>
        </div>
      </div>
      <div
        className="absolute bottom-0 left-0 right-0 h-72 w-full"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
        }}
      ></div>
    </div>
  );
};

export default Home;
