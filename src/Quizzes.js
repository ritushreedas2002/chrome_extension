import React from "react";

import { useNavigate } from "react-router-dom";

const Quizzes = () => {
  const navigate=useNavigate();
  return (
    <div
      className=" bg-yellow-100"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "700px",
        height: "500px",
        position: "relative",
      }}
    >
      <div className="absolute font-bold top-12 text-2xl mb-20">
        Quizzomania
      </div>
      <div className=" flex justify-around w-[80%]">
        <div
          className="buttons-container flex flex-col"
          style={{ marginTop: "20px" }}
        >
          <button className="p-4 m-2 w-48 text-lg font-semibold bg-blue-500 text-white rounded-lg" onClick={()=>{navigate(`/quiz/${0}`)}}>
            C++
          </button >
          <button className="p-4 m-2 w-48 text-lg font-semibold bg-blue-500 text-white rounded-lg" onClick={()=>{navigate(`/quiz/${1}`)}}>
            Java
          </button>
          <button className="p-4 m-2 w-48 text-lg font-semibold bg-blue-500 text-white rounded-lg">
            Python
          </button>
          <button className="p-4 m-2 w-48 text-lg font-semibold bg-blue-500 text-white rounded-lg">
            JavaScript
          </button>
        </div>
        {/* <div
          className="buttons-container flex flex-col"
          style={{ marginTop: "20px" }}
        >
          <button className="p-4 m-2 w-52 text-lg font-semibold bg-blue-500 text-white rounded-lg">
            Operating System
          </button>
          <button className="p-4 m-2 w-52 text-lg font-semibold bg-blue-500 text-white rounded-lg">
            DBMS
          </button>
          <button className="p-4 m-2 w-52 text-lg font-semibold bg-blue-500 text-white rounded-lg">
            Computer Networks
          </button>
          <button className="p-4 m-2 w-52 text-lg font-semibold bg-blue-500 text-white rounded-lg">
            System Design
          </button>
        </div> */}
      </div>

      {/* {questions.map((item, index) => (
        <div key={index}>
          <h3>{item.topic}</h3>
          <ul>
            {item.questions.map((q, qIndex) => (
              <li key={qIndex}>{q.questionText}</li>
            ))}
          </ul>
        </div>
      ))} */}
    </div>
  );
};

export default Quizzes;
