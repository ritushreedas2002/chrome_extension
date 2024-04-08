import React, { useState, useEffect } from "react";
import { MdOutlineDelete } from "react-icons/md";
const QuizProgress = () => {
  const [quizResults, setQuizResults] = useState([]);

  useEffect(() => {
    // Fetch quiz results from local storage
    const storedResults = JSON.parse(localStorage.getItem("quizResults")) || [];
    setQuizResults(storedResults);
  }, []);

  const deleteResult = (indexToDelete) => {
    // Filter out the result at the specific index
    const updatedResults = quizResults.filter((_, index) => index !== indexToDelete);

    // Update local storage with the new results array
    localStorage.setItem("quizResults", JSON.stringify(updatedResults));

    // Update state to reflect the change
    setQuizResults(updatedResults);
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
      <h1 className="absolute font-bold text-white top-8 text-3xl mb-20">Your Quiz Results</h1>
      <div className="absolute inset-0 overflow-y-auto mt-20 p-4  no-scrollbar max-h-96">
        {quizResults.map((result, index) => (
          <li
            key={index}
            className=" flex items-center justify-center p-3 w-[80%] ml-20 my-2 bg-green-100 rounded shadow"
          >
            <div className=" w-[88%]">
              <p className="text-xl font-bold mb-3">
                Topic: {result.sub} ({result.topic})
              </p>
              <div className="flex justify-around">
              <p className="text-md ml-10">Date: {result.date}</p>
              <p className="text-md"><span className="font-bold">Score: </span>{result.score} out of 10</p>
              </div>
            </div>
            <button
                className=" ml-4 bg-red-500 justify-end text-2xl font-bold hover:bg-red-600 text-white py-1.5 px-3 rounded-md"
                onClick={() => deleteResult(index)}
              >
                <MdOutlineDelete />
              </button>
          </li>
        ))}
      </div>
    </div>
  );
};

export default QuizProgress;
