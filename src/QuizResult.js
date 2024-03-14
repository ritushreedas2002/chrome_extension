import React from "react";
import { useLocation, Link } from "react-router-dom";

const QuizResult = () => {
  const location = useLocation();
  const { score } = location.state || { score: 0 }; // Default score to 0 if not provided

  return (
    <div className="quiz-result-container" style={{ textAlign: "center", marginTop: "20px" }}>
      <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
      <p className="text-xl">Your Score: {score} out of 10</p>
      <Link to="/">
        <button className="mt-4 p-2 bg-blue-500 text-white rounded-md">Try Again</button>
      </Link>
    </div>
  );
};

export default QuizResult;
