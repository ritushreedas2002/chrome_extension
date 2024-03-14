import React, { useState, useEffect } from "react";

const TrackProgress = () => {
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
      className="track-progress-container bg-yellow-100 p-4"
      style={{ width: "700px", minHeight: "500px", position: "relative" }}
    >
      <h2 className="text-2xl font-bold mb-4">Your Quiz Results</h2>
      <ul>
        {quizResults.map((result, index) => (
          <li
            key={index}
            className="m-2 p-2 rounded-lg bg-white flex justify-between items-center"
          >
            <div>
              <p className="text-xl font-bold">
                Topic: {result.sub} ({result.topic})
              </p>
              <p className="text-base">Date: {result.date}</p>
              <p className="text-base">Score: {result.score} out of 10</p>
            </div>
            <button
              className="p-2 bg-red-500 text-white rounded-md"
              onClick={() => deleteResult(index)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrackProgress;
