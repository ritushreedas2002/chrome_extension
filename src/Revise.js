// import React, { useState } from "react";
// import dsa from "./dsa.json"
// const Revision = () => {
//   const topic = "Binary Search";

//   const handleSendToChatGPT = () => {
//     // Sending a message to the background script
//     chrome.runtime.sendMessage({
//        action: "navigateToChatGPT",
//       topic: topic,
//     });
//   };
//   return (
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         justifyContent: "center",
//         width: "700px",
//         height: "500px",
//       }}
//     >
//       <div className="absolute font-bold top-12 text-2xl mb-20">
//         DSA Revision Buddy
//       </div>
//       <div
//         className="flex flex-wrap justify-center items-center"
//         style={{ maxWidth: "70%" }}
//       >
//         {topic}
//       </div>
//       <button
//         onClick={handleSendToChatGPT}
//         className="p-2 bg-blue-500 text-white rounded-lg mt-5"
//       >
//         Send to ChatGPT
//       </button>
//     </div>
//   );
// };

// export default Revision;

// import dsa from "./dsa.json"; // Ensure this is the correct path to your JSON data
// import { useParams } from "react-router-dom";
// import { useIndex } from "./Context/Context";
// import { useEffect } from "react";

// const Revision = () => {
//   const { index } = useIndex();
//   const topicIndex = parseInt(index, 10); // Ensure it's a number
//   const topic = dsa[topicIndex];
//   const topicInfo = topic?.Info;

//   useEffect(() => {
//     console.log(`Current index: ${index}`); // Log to verify index updates
//   }, [index]); // Dependency array to re-run this effect when `index` changes

//   const handleSendToChatGPT = () => {
//     chrome.runtime.sendMessage({
//       action: "navigateToChatGPT",
//       topic: topic.Topic,
//     });
//   };

//   return (
//     <div className="flex flex-col items-center justify-center w-full h-screen p-4">
//       <h1 className="text-3xl font-bold mb-10">DSA Revision Buddy</h1>
//       <div className="flex flex-col items-start justify-start w-full max-w-4xl h-full overflow-auto p-4 bg-white rounded shadow">
//         <h2 className="text-2xl font-bold mb-4 ml-56">{topic.Topic}</h2>
//         <p className="mb-6 text-center" style={{ whiteSpace: "pre-wrap" }}>
//           {topicInfo?.Definition}
//         </p>
//         {Object.entries(topicInfo?.Algorithms || {}).map(
//           ([key, value], index) => (
//             <div key={index} className="mb-4 items-center w-full">
//               <h3 className="text-xl font-semibold mb-2">{key}</h3>
//               <pre className="bg-gray-100 rounded p-2 whitespace-pre-wrap text-center">
//                 {value}
//               </pre>
//             </div>
//           )
//         )}
//         <div className="w-full">
//           <h3 className="text-2xl font-bold text-center">Complexities</h3>
//           {Object.entries(topicInfo?.Complexities || {}).map(
//             ([key, values], index) => (
//               <div key={index} className="mt-2">
//                 <h4 className="font-bold text-center text-lg">{key}</h4>
//                 {typeof values === "object" ? (
//                   <ul className="list-disc list-inside">
//                     {Object.entries(values).map(
//                       ([subKey, subValue], subIndex) => (
//                         <li
//                           key={subIndex}
//                           className="text-center text-md "
//                         >{`${subKey}: ${subValue}`}</li>
//                       )
//                     )}
//                   </ul>
//                 ) : (
//                   <p className="text-center">{values}</p>
//                 )}
//               </div>
//             )
//           )}
//         </div>
//         <button
//           onClick={handleSendToChatGPT}
//           className="mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//         >
//           Send to ChatGPT
//         </button>
//       </div>
//     </div>

    
//   );
// };

// export default Revision;



import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import dsa from './dsa.json'; // Adjust this path as necessary
import { useIndex } from './Context/Context'; // Adjust this path as necessary

const Revision = () => {
  const { category } = useParams();
  const { indices } = useIndex();
  console.log(indices);
  const initialIndex = indices[category] || 0; // Get initial index from context, default to 0
  const [currentIndex, setCurrentIndex] = useState(initialIndex); 
  const [currentProblem, setCurrentProblem] = useState(null);
  useEffect(() => {
    const categoryData = dsa.find(cat => cat.category === category);
    if (!categoryData) {
      console.error('Category not found');
      return;
    }
    const problem = categoryData.Problems[currentIndex];
    setCurrentProblem(problem);
  }, [category, currentIndex]);


  const handlePrev = () => {
    setCurrentIndex(prevIndex => Math.max(prevIndex - 1, 0)); // Ensure index doesn't go below 0
  };

  const handleNext = () => {
    const categoryData = dsa.find(cat => cat.category === category);
    setCurrentIndex(prevIndex => Math.min(prevIndex + 1, categoryData.Problems.length - 1)); // Ensure index doesn't exceed max
  };
  if (!currentProblem) {
    return <div>Loading...</div>;
  }

  // Function to handle sending data to ChatGPT, assuming implementation exists
  const handleSendToChatGPT = () => {
        chrome.runtime.sendMessage({
          action: "navigateToChatGPT",
          topic:currentProblem.Topic,
        });
      };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen p-4">
      <h1 className="text-3xl font-bold mb-10">DSA Revision Buddy</h1>
      <div className="flex flex-col items-start justify-start w-full max-w-4xl h-full overflow-auto p-4 bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-4 text-center">{currentProblem.Topic}</h2>
        <p className="mb-6 text-center" style={{ whiteSpace: 'pre-wrap' }}>
          {currentProblem.Info.Definition}
        </p>
        {Object.entries(currentProblem.Info.Algorithms || {}).map(([key, value], index) => (
          <div key={index} className="mb-4 items-center w-full">
            <h3 className="text-xl font-semibold mb-2 text-center">{key}</h3>
            <pre className="bg-gray-100 rounded p-2 whitespace-pre-wrap text-center">
              {value}
            </pre>
          </div>
        ))}
        <div className="w-full text-center">
          <h3 className="text-2xl font-bold">Complexities</h3>
          {Object.entries(currentProblem.Info.Complexities || {}).map(([key, values], index) => (
            <div key={index} className="mt-2">
              <h4 className="font-bold text-lg">{key}</h4>
              {typeof values === 'object' ? (
                <ul className="list-disc list-inside">
                  {Object.entries(values).map(([subKey, subValue], subIndex) => (
                    <li key={subIndex} className="text-md">{`${subKey}: ${subValue}`}</li>
                  ))}
                </ul>
              ) : (
                <p>{values}</p>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-5">
          <button onClick={handlePrev} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Prev
          </button>
          <button onClick={handleNext} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-[480px]">
            Next
          </button>
        </div>
        <button
          onClick={handleSendToChatGPT}
          className="mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Send to ChatGPT
        </button>
      </div>
    </div>
  );
};

export default Revision;

