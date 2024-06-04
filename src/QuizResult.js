
// import React from "react";
// import { useLocation, Link } from "react-router-dom";
// import Chart from "react-apexcharts"; // Import the Chart component

// const QuizResult = () => {
//   const location = useLocation();
//   const { score } = location.state || { score: 0 }; // Default score to 0 if not provided

//   const chartOptions = {
//     labels: ["Score", "Remaining"],
//     colors: ["#00E396", "#FF4560"], // Green for score, Red for remaining
//     legend: {
//       position: 'bottom'
//     },
//     plotOptions: {
//       pie: {
//         donut: {
//           size: '45%', // Adjust the size of the donut hole as needed
//         }
//       }
//     },
//     responsive: [{
//       breakpoint: 480,
//       options: {
//         chart: {
//           width: 200
//         },
//         legend: {
//           position: 'bottom'
//         }
//       }
//     }]
//   };
//   const chartSeries = [score, 10 - score]; // Score and remaining points

//   return (
//     <div
//     className="quiz-container bg-[#0A2342] p-4"
//     style={{ width: "700px", minHeight: "500px", position: "relative" }}
//   >
//     <div className="quiz-result-container">
//       <h2 className="text-2xl font-bold mb-4 text-white">Quiz Completed!</h2>
//       <p className="text-xl text-white">Your Score: {score} out of 10</p>
//       {/* Render the pie chart */}
//       <Chart
//         options={chartOptions}
//         series={chartSeries}
//         type="donut"
//         width="380"
//       />
//       <Link to="/quiz">
//         <button className="mt-4 p-2 bg-green-300 text-white rounded-md">Try Again</button>
//       </Link>
//     </div>
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
      position: 'bottom',
      labels: {
        colors: ['#FFFFFF'] ,// Set legend text color to white
        useSeriesColors: false,
      }
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
          position: 'bottom',
          labels: {
            colors: ['#FFFFFF'] // Set legend text color to white for small screens
          }
        }
      }
    }]
  };
  const chartSeries = [score, 10 - score]; // Score and remaining points

  return (
    <div
      className="quiz-container bg-[#0A2342] p-4"
      style={{ width: "700px", minHeight: "500px", position: "relative", display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
    >
      <div className="quiz-result-container" style={{ textAlign: 'center' }}>
        <h2 className="text-2xl font-bold mb-4 text-white">Quiz Completed!</h2>
        <p className="text-xl text-white">Your Score: {score} out of 10</p>
        {/* Render the pie chart */}
        <Chart
          options={chartOptions}
          series={chartSeries}
          type="donut"
          width="380"
        />
        <Link to="/quiz">
          <button className="mt-4 p-2 bg-green-300 text-white rounded-md">Try Again</button>
        </Link>
      </div>
    </div>
  );
};

export default QuizResult;


