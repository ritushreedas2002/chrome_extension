// import React, { useState, useEffect } from 'react';



// const QuizPage = ({ questions }) => {
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [selectedOption, setSelectedOption] = useState(null);

//   const handleOptionClick = (option) => {
//     // Set selected option and fetch next question after a delay
//     setSelectedOption(option);
//     if (currentQuestionIndex < 9) { // Assuming we have at least 10 questions
//       setTimeout(() => {
//         setSelectedOption(null); // Reset selection for the next question
//         setCurrentQuestionIndex(currentQuestionIndex + 1);
//       }, 1000); // Wait for 1 second before moving to the next question
//     }
//   };

//   const currentQuestion = questions[currentQuestionIndex];

//   return (
//     <div className="quiz-card bg-purple-200 p-5 rounded-lg shadow-md text-center">
//       <div className="question-count text-lg font-bold">
//         {currentQuestionIndex + 1} / {questions.length}
//       </div>
//       <div className="question-text font-semibold my-3">
//         {currentQuestion.questionText}
//       </div>
//       <div className="options-container">
//         {currentQuestion.options.map((option, index) => (
//           <button
//             key={index}
//             className={`option-btn font-medium my-2 p-3 rounded-full w-full 
//                         ${selectedOption === option ? 'bg-yellow-300' : 'bg-white'}`}
//             onClick={() => handleOptionClick(option)}
//             disabled={selectedOption !== null}
//           >
//             {option.optionTxt}
//           </button>
//         ))}
//       </div>
//       {currentQuestionIndex < 9 && (
//         <button className="next-btn bg-blue-500 text-white mt-4 py-2 px-6 rounded-lg">
//           Next
//         </button>
//       )}
//     </div>
//   );
// };

// export default QuizPage;

import React, { useState } from "react";
import { useParams } from "react-router-dom";
import cquestions from "./c++questions.json";

const QuizPage = () => {
  const { index, topicindex } = useParams();
  
  const topic = cquestions[index]?.topics[topicindex] || [];
  const [selectedAnswers, setSelectedAnswers] = useState(Array(topic.questions.length).fill(null));

  const handleAnswerSelection = (questionIndex, answer) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[questionIndex] = answer;
    setSelectedAnswers(newSelectedAnswers);
  };

  return (
    <div
      className="bg-yellow-100"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "700px",
        minHeight: "500px",
        position: "relative",
        padding: "20px",
      }}
    >
      <h1 className="font-bold text-2xl mb-4">Quiz Questions</h1>
      <div className="overflow-auto" style={{ maxHeight: "440px", width: "100%" }}>
        {topic.questions.map((question, qIndex) => (
          <div key={qIndex} className="bg-white p-4 rounded-lg shadow mb-4">
            <div className="font-semibold mb-2">{question.questionText}</div>
            <div className="flex flex-col">
              {question.options.map((option, oIndex) => (
                <button
                  key={oIndex}
                  className={`text-left p-2 rounded-lg ${selectedAnswers[qIndex] === option.optionTxt ? 'bg-blue-200' : 'hover:bg-blue-100'}`}
                  onClick={() => handleAnswerSelection(qIndex, option.optionTxt)}
                >
                  {option.optionTxt}
                </button>
              ))}
            </div>
            {selectedAnswers[qIndex] && (
              <div className="mt-4 p-2 border-t">
                <span className="font-semibold">Answer: Option</span> {question.answer.Letter}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizPage;




