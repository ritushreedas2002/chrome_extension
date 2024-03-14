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



import dsa from './dsa.json'; // Ensure this is the correct path to your JSON data
import { useParams } from 'react-router-dom';
import { useIndex } from './Context/Context';
import { useEffect } from 'react';

const Revision = () => {
  const { index } = useIndex();
  const topicIndex = parseInt(index, 10); // Ensure it's a number
  const topic = dsa[topicIndex];
  const topicInfo = topic?.Info;
  
  useEffect(() => {
    console.log(`Current index: ${index}`); // Log to verify index updates
  }, [index]); // Dependency array to re-run this effect when `index` changes


  const handleSendToChatGPT = () => {
    chrome.runtime.sendMessage({
      action: 'navigateToChatGPT',
      topic: topic.Topic,
    });
  };

 

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen p-4">
      <h1 className="text-3xl font-bold mb-10">DSA Revision Buddy</h1>
      <div className="flex flex-col items-start justify-start w-full max-w-4xl h-full overflow-auto p-4 bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-4 ml-56">{topic.Topic}</h2>
        <p className="mb-6 text-center" style={{ whiteSpace: 'pre-wrap' }}>{topicInfo?.Definition}</p>
        {Object.entries(topicInfo?.Algorithms || {}).map(([key, value], index) => (
          <div key={index} className="mb-4 items-center w-full">
            <h3 className="text-xl font-semibold mb-2">{key}</h3>
            <pre className="bg-gray-100 rounded p-2 whitespace-pre-wrap text-center">{value}</pre>
          </div>
        ))}
        <div className="w-full">
      <h3 className="text-2xl font-bold text-center">Complexities</h3>
      {Object.entries(topicInfo?.Complexities || {}).map(([key, values], index) => (
         <div key={index} className="mt-2">
           <h4 className="font-bold text-center text-lg">{key}</h4>
           {typeof values === 'object' ? (
             <ul className="list-disc list-inside">
               {Object.entries(values).map(([subKey, subValue], subIndex) => (
                 <li key={subIndex} className="text-center text-md">{`${subKey}: ${subValue}`}</li>
               ))}
             </ul>
           ) : (
             <p className="text-center">{values}</p>
           )}
         </div>
       ))}
     </div> 
        <button
          onClick={handleSendToChatGPT}
          className="mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Send to ChatGPT
        </button>
        
      </div>
    </div>


//     <div className="flex flex-col items-center justify-center w-full h-screen p-4">
//   <h1 className="text-3xl font-bold mb-10">DSA Revision Buddy</h1>
//   <div className="flex flex-col items-center justify-center w-full max-w-4xl h-full overflow-auto p-4 bg-white rounded shadow">
//     <h2 className="text-2xl font-bold mb-4">{topic.Topic}</h2>
//     <p className="mb-6 text-center">{topicInfo?.Definition}</p>
//     {Object.entries(topicInfo?.Algorithms || {}).map(([key, value], index) => (
//       <div key={index} className="mb-4 w-full">
//         <h3 className="text-xl font-semibold mb-2 text-center">{key}</h3>
//         <pre className="bg-gray-100 rounded p-2 whitespace-pre-wrap text-left">{value}</pre>
//       </div>
//     ))}
//     <div className="w-full">
//       <h3 className="text-lg font-semibold text-center">Complexities</h3>
//       {Object.entries(topicInfo?.Complexities || {}).map(([key, values], index) => (
//         <div key={index} className="mt-2">
//           <h4 className="font-semibold text-center">{key}</h4>
//           {typeof values === 'object' ? (
//             <ul className="list-disc list-inside">
//               {Object.entries(values).map(([subKey, subValue], subIndex) => (
//                 <li key={subIndex} className="text-center">{`${subKey}: ${subValue}`}</li>
//               ))}
//             </ul>
//           ) : (
//             <p className="text-center">{values}</p>
//           )}
//         </div>
//       ))}
//     </div>
//     <button
//       onClick={handleSendToChatGPT}
//       className="mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//     >
//       Send to ChatGPT
//     </button>
//   </div>
// </div>

  );
};

export default Revision;


