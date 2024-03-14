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

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import cquestions from "./questions.json";
import { useNavigate } from "react-router-dom";

const shuffleArray = (array) => {
  const newArray = array.slice();
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const QuizPage = () => {
  const { index, topicindex } = useParams();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();

  // Fetch and set random 10 questions for the selected topic
  useEffect(() => {
    const topicQuestions =
      cquestions[index]?.topics[topicindex]?.questions || [];
    const shuffledQuestions = shuffleArray(topicQuestions);
    setQuestions(shuffledQuestions.slice(0, 10));
  }, [index, topicindex]);

  const handleAnswerSelection = (optionIndex) => {
    setSelectedAnswer(optionIndex);
    const correct = isCorrectAnswer(optionIndex);
    if (correct) {
      setScore((prevScore) => prevScore + 1);
    }
  };

  const isCorrectAnswer = (optionIndex) => {
    const letters = ["A", "B", "C", "D"]; // Add more letters if there are more than 4 options per question
    return (
      letters[optionIndex] === questions[currentQuestionIndex].answer.Letter
    );
  };

  const handleSubmit = () => {
    //alert(`Your quiz score: ${score} out of 10`);
    // Reset for a new quiz or navigate to another page
    navigate('/quizresult', { state: { score } });
  };

  const currentQuestion = questions[currentQuestionIndex];

  function formatQuestionText(questionText) {
    // Split the questionText by '\n' to get an array of lines
    const lines = questionText.split("\n");
    // Map the lines to span elements, adding <br /> after each line except the last
    return lines.map((line, index) => (
      <React.Fragment key={index}>
        {line}
        {index < lines.length - 1 && <br />}
      </React.Fragment>
    ));
  }

  return (
    <div
      className="quiz-container bg-yellow-100 p-4"
      style={{ width: "700px", minHeight: "500px", position: "relative" }}
    >
      <h1 className="text-2xl font-bold mb-4">Quiz Questions</h1>
      {currentQuestion && (
        <div className="question-card bg-white p-4 rounded-md shadow-lg">
          <p className="question mb-4 font-semibold text-lg text-start">
            {currentQuestionIndex + 1}
            {". "}
            {formatQuestionText(currentQuestion.questionText)}
          </p>
          <div className="options flex flex-col">
            {currentQuestion.options.map((option, index) => {
              // Map index to option letter (A, B, C, D, ...)
              const optionLetter = String.fromCharCode(65 + index); // ASCII value for 'A' is 65
              return (
                <button
                  key={index}
                  className={`option p-2 rounded-md text-left text-base
                  ${
                    selectedAnswer === index
                      ? isCorrectAnswer(index)
                        ? "bg-green-500"
                        : "bg-red-500"
                      : "hover:bg-blue-100"
                  }`}
                  onClick={() => handleAnswerSelection(index)}
                  disabled={selectedAnswer !== null}
                >
                  {optionLetter}. {option.optionTxt}{" "}
                  {/* Display the option letter */}
                </button>
              );
            })}
          </div>
          {selectedAnswer !== null && (
            <div className="mt-4 p-2 border-t">
              <span className="font-semibold">Correct Answer:</span>{" "}
              {currentQuestion.answer.text} {currentQuestion.answer.Letter}
            </div>
          )}
        </div>
      )}
      {/* {currentQuestionIndex < questions.length - 1 && (
        <button
          className="next-question bg-blue-500 text-white p-2 mt-4 rounded-md text-md"
          onClick={() => {
            setCurrentQuestionIndex((currentIndex) => currentIndex + 1);
            setSelectedAnswer(null); // Reset selected answer for the next question
          }}
        >
          Next Question
        </button>
      )} */}
      <div className="navigation mt-4">
        {currentQuestionIndex === questions.length - 1 ? (
          <button
            className="submit-quiz bg-green-500 text-white p-2 rounded-md"
            onClick={handleSubmit}
          >
            Submit Quiz
          </button>
        ) : (
          <button
            className="next-question bg-blue-500 text-white p-2 rounded-md"
            onClick={() => {
              setCurrentQuestionIndex((currentIndex) => currentIndex + 1);
              setSelectedAnswer(null); // Reset selected answer for the next question
            }}
          >
            Next Question
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizPage;
