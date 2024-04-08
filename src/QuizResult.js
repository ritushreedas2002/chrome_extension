// import React from "react";
// import { useLocation, Link } from "react-router-dom";

// const QuizResult = () => {
//   const location = useLocation();
//   const { score } = location.state || { score: 0 }; // Default score to 0 if not provided

//   return (
//     <div className="quiz-result-container" style={{ textAlign: "center", marginTop: "20px" }}>
//       <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
//       <p className="text-xl">Your Score: {score} out of 10</p>
//       <Link to="/">
//         <button className="mt-4 p-2 bg-blue-500 text-white rounded-md">Try Again</button>
//       </Link>
//     </div>
//   );
// };

// export default QuizResult;



import React from "react";
import { useLocation, Link } from "react-router-dom";
import Chart from "react-apexcharts"; // Import the Chart component

const QuizResult = () => {
  const location = useLocation();
  const { score } = location.state || { score: 0 }; // Default score to 0 if not provided

  const chartOptions = {
    labels: ["Score", "Remaining"],
    colors: ["#00E396", "#FF4560"], // Green for score, Red for remaining
    legend: {
      position: 'bottom'
    },
    plotOptions: {
      pie: {
        donut: {
          size: '45%', // Adjust the size of the donut hole as needed
        }
      }
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  };
  const chartSeries = [score, 10 - score]; // Score and remaining points

  return (
    <div className="quiz-result-container" style={{ textAlign: "center", marginTop: "20px" }}>
      <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
      <p className="text-xl">Your Score: {score} out of 10</p>
      {/* Render the pie chart */}
      <Chart
        options={chartOptions}
        series={chartSeries}
        type="donut"
        width="380"
      />
      <Link to="/">
        <button className="mt-4 p-2 bg-blue-500 text-white rounded-md">Try Again</button>
      </Link>
    </div>
  );
};

export default QuizResult;

