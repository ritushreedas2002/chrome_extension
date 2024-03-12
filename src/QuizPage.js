import React, { useState, useEffect } from 'react';

const QuizPage = ({ questions }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option) => {
    // Set selected option and fetch next question after a delay
    setSelectedOption(option);
    if (currentQuestionIndex < 9) { // Assuming we have at least 10 questions
      setTimeout(() => {
        setSelectedOption(null); // Reset selection for the next question
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }, 1000); // Wait for 1 second before moving to the next question
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="quiz-card bg-purple-200 p-5 rounded-lg shadow-md text-center">
      <div className="question-count text-lg font-bold">
        {currentQuestionIndex + 1} / {questions.length}
      </div>
      <div className="question-text font-semibold my-3">
        {currentQuestion.questionText}
      </div>
      <div className="options-container">
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            className={`option-btn font-medium my-2 p-3 rounded-full w-full 
                        ${selectedOption === option ? 'bg-yellow-300' : 'bg-white'}`}
            onClick={() => handleOptionClick(option)}
            disabled={selectedOption !== null}
          >
            {option.optionTxt}
          </button>
        ))}
      </div>
      {currentQuestionIndex < 9 && (
        <button className="next-btn bg-blue-500 text-white mt-4 py-2 px-6 rounded-lg">
          Next
        </button>
      )}
    </div>
  );
};

export default QuizPage;
