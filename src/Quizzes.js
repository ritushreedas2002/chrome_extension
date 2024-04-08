import React from "react";
import backgroundImage from "./assests/quiz.png";
import { Link, useNavigate } from "react-router-dom";
import { IoChevronBackCircleOutline } from "react-icons/io5";

const Quizzes = () => {
  const navigate = useNavigate();
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
      <Link to="/">
        <button className="fixed left-4 bottom-4 bg-[#479d6b] hover:bg-[#31744d] text-white text-lg font-bold p-2 rounded-lg transition-transform duration-100 cursor-pointer hover:scale-110">
          <IoChevronBackCircleOutline />
        </button>
      </Link>
      <Link to="/trackprogress">
        <button
          className="fixed right-4 top-4 bg-[#479d6b] hover:bg-[#31744d] text-white text-base p-2 rounded-lg transition-transform duration-100 cursor-pointer hover:scale-110"
        >
          View Results
        </button>
      </Link>

      <div className=" flex ">
        <div className="z-10 mt-[20%] text-white text-center w-[60%]  ml-10">
          <div className=" text-4xl font-bold mb-12">QuizzoMania</div>
          <div className=" text-xl font-semibold mb-4">
            Navigate the Depths of Programming, Dive into Our Programming Quiz!
          </div>
          <div className=" text-xl font-semibold">
            Expertly Crafted Questions for Top Programming Language Preparation
          </div>
        </div>
        <div className="mt-[15%] flex flex-col justify-center items-center w-[40%]">
          <button
            className="p-4 my-2 w-48 text-xl font-semibold bg-[#479d6b] hover:bg-[#31744d] text-white rounded-3xl"
            onClick={() => {
              navigate(`/quiz/${0}`);
            }}
          >
            C++
          </button>
          <button
            className="p-4 my-2 w-48 text-xl font-semibold bg-[#479d6b] hover:bg-[#31744d] text-white rounded-3xl"
            onClick={() => {
              navigate(`/quiz/${1}`);
            }}
          >
            Java
          </button>
          <button className="p-4 my-2 w-48 text-xl font-semibold bg-[#479d6b] hover:bg-[#31744d] text-white rounded-3xl">
            Python
          </button>
          <button className="p-4 my-2 w-48 text-xl font-semibold bg-[#479d6b] hover:bg-[#31744d] text-white rounded-3xl">
            JavaScript
          </button>
        </div>
      </div>
      <div
        className="absolute top-0 left-16 h-40 w-[60%]"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top left",
        }}
      ></div>
    </div>
  );
};

export default Quizzes;
