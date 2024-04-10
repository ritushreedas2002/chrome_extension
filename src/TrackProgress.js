// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { IoChevronBackCircleOutline } from "react-icons/io5";
// import dsa from "./dsa.json"; // Assuming the path is correct

// const Trackprogress = () => {
//   const [progress, setProgress] = useState({});

//   useEffect(() => {
//     // Initialize an object to track progress
//     const progressData = {};

//     // Iterate over each category in the JSON file
//     dsa.forEach((categoryData) => {
//       const categoryName = categoryData.category;
//       const totalProblems = categoryData.Problems.length;

//       // Retrieve the completed topics for this category from localStorage
//       const storedCompletedTopicsJSON = localStorage.getItem(`${categoryName}completedTopics`);
//       const completedTopics = storedCompletedTopicsJSON ? JSON.parse(storedCompletedTopicsJSON) : [];

//       // Calculate progress
//       progressData[categoryName] = {
//         completed: completedTopics.length,
//         total: totalProblems,
//         completedTopics: completedTopics // Store the completed topics for detailed view
//       };
//     });

//     setProgress(progressData);
//   }, []);

//   return (
//     <div
//       className="relative bg-[#0A2342] flex flex-col items-center justify-center w-full h-screen p-4"
//     >
//       <h1 className="text-3xl text-white font-bold mb-4">Progress Tracker</h1>
//       {Object.entries(progress).map(([category, {completed, total, completedTopics}], index) => (
//         <div key={index} className="text-white mb-2">
//           <h2 className="text-xl font-bold">{category}</h2>
//           <div className="w-full bg-indigo-800 rounded-full h-2.5 dark:bg-gray-700 mt-2">
//           <div
//           className="bg-purple-600 h-2.5 rounded-full"
//           style={{ width: `${completed}%` }}
//         ></div>
//         </div>
//           <ul>
//             {completedTopics.map((topic, index) => (
//               <li key={index}>{topic}</li>
//             ))}
//           </ul>
//         </div>
//       ))}
//       <Link to="/">
//         <button className="fixed left-4 bottom-4 bg-[#479d6b] hover:bg-[#31744d] text-white text-lg font-bold p-2 rounded-lg transition-transform duration-100 cursor-pointer hover:scale-110">
//           <IoChevronBackCircleOutline />
//         </button>
//       </Link>
//     </div>
//   );
// };

// export default Trackprogress;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import dsa from "./dsa.json";
import {
  IoChevronBackCircleOutline,
  IoChevronDownOutline,
  IoChevronUpOutline,
} from "react-icons/io5";
import ReactApexChart from "react-apexcharts";

const Trackprogress = () => {
  const [progress, setProgress] = useState({});
  const [expandedCategory, setExpandedCategory] = useState(null); // To track which category is expanded
  const [totalproblems, settotalproblems] = useState(0);
  const [totalcompletedproblems, settotalcompletedproblems] = useState(0);



   // Chart configuration
   const [chartOptions, setChartOptions] = useState({
    series: [totalcompletedproblems, totalproblems - totalcompletedproblems], // Dynamically setting the series data
    options: {
      chart: {
        type: "donut",
      },
      labels: ["Completed Problems", "Remaining Problems"],
      colors: ["#76ABAE", "#5F5D9C"], // Customizing colors
      plotOptions: {
        pie: {
          donut: {
            size: "60%",
          },
        },
      },
      legend: {
        show: true,
        position: "bottom",
        labels: {
          colors: "white",
        },
      },
      dataLabels: {
        enabled: false,
      },
    },
  });

  // Dynamically update the chart when `totalCompletedProblems` or `totalProblems` changes
  useEffect(() => {
    setChartOptions(prevOptions => ({
      ...prevOptions,
      series: [totalcompletedproblems, totalproblems - totalcompletedproblems],
    }));
  }, [totalcompletedproblems, totalproblems]);

 
  
  useEffect(() => {
    localStorage.removeItem('completedTopics');
    let tempTotalProblems = 0;
    let tempTotalCompletedProblems = 0;
    const progressData = {};
  
    dsa.forEach((categoryData) => {
      const categoryName = categoryData.category;
      const totalProblems = categoryData.Problems.length;
      tempTotalProblems += totalProblems;
  
      const storedCompletedTopicsJSON = localStorage.getItem(`${categoryName}completedTopics`);
      const completedTopics = storedCompletedTopicsJSON ? JSON.parse(storedCompletedTopicsJSON) : [];
      tempTotalCompletedProblems += completedTopics.length;
  
      progressData[categoryName] = {
        completed: completedTopics.length,
        total: totalProblems,
        completedTopics: completedTopics,
      };
    });
  
    // Correctly update state only once after all calculations are done
    settotalproblems(tempTotalProblems);
    settotalcompletedproblems(tempTotalCompletedProblems);
    setProgress(progressData);

  }, []);
  
  // Log updated state values in a separate useEffect to ensure they reflect the latest updates
  useEffect(() => {
    console.log(totalproblems); // Now correctly logs updated state
    console.log(totalcompletedproblems); // Now correctly logs updated state
  }, [totalproblems, totalcompletedproblems]);
  

  // Toggle the expanded state for a category
  const toggleExpand = (category) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  return (
    <div
      className="relative bg-[#0A2342]"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "700px",
        height: "500px",
      }}
    >
      <div className="w-[30%] " style={{ background: 'transparent' }}>
       <ReactApexChart
        options={chartOptions.options}
        series={chartOptions.series}
        type="donut"
        width={350}
      />
      </div>
      <div className="relative  flex flex-col items-center justify-center w-[70%] min-h-screen p-4 gap-4 ml-16">
       
       
        {Object.entries(progress).map(
          ([category, { completed, total, completedTopics }], index) => (
            <div
              key={index}
              className="w-[70%] max-w-md p-4 bg-white rounded-lg shadow-md"
            >
              <h2 className="text-xl font-bold mb-2">{category}</h2>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div
                  className="bg-green-600 h-2.5 rounded-full"
                  style={{ width: `${(completed / total) * 100}%` }}
                ></div>
              </div>
              <div className="mt-2 flex justify-between items-center">
                <span>
                  {completed} of {total} problems completed
                </span>
                <button
                  onClick={() => toggleExpand(category)}
                  className="text-purple-500"
                >
                  {expandedCategory === category ? (
                    <IoChevronUpOutline />
                  ) : (
                    <IoChevronDownOutline />
                  )}
                </button>
              </div>
              {expandedCategory === category && (
                <div className="mt-2 overflow-auto max-h-12 overflow-y-auto no-scrollbar">
                  <h1 className="font-bold text-sm">List of {category} topics completed</h1>
                  <ul className="text-xs">
                    {completedTopics.map((topic, idx) => (
                      <li key={idx} className="text-gray-800">
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )
        )}
        <Link to="/">
          <button className="fixed left-4 bottom-4 bg-[#479d6b] hover:bg-[#31744d] text-white text-lg font-bold p-2 rounded-lg transition-transform duration-100 cursor-pointer hover:scale-110">
            <IoChevronBackCircleOutline />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Trackprogress;
