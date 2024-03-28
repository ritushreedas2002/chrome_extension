import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import dsa from "./dsa.json";
import { useIndex } from "./Context/Context";
import axios from "axios";

const Revision = () => {
  const { category } = useParams();
  const { indices } = useIndex();
  const initialIndex = indices[category] || 0; // Get initial index from context, default to 0
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [currentProblem, setCurrentProblem] = useState(null);
  const [showFlowChart, setShowFlowChart] = useState(false);

  useEffect(() => {
    const categoryData = dsa.find((cat) => cat.category === category);
    if (!categoryData) {
      console.error("Category not found");
      return;
    }
    const problem = categoryData.Problems[currentIndex];
    setCurrentProblem(problem);
  }, [category, currentIndex]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0)); // Ensure index doesn't go below 0
  };

  const handleNext = () => {
    const categoryData = dsa.find((cat) => cat.category === category);
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + 1, categoryData.Problems.length - 1)
    ); // Ensure index doesn't exceed max
  };

  useEffect(() => {
    if (currentProblem && showFlowChart) {
      fetchFlowchartImage(currentProblem.Info.imageLink);
    }
  }, [currentProblem, showFlowChart]);

  const fetchFlowchartImage = async (imageLink) => {
    try {
      const response = await axios.get(imageLink, { responseType: "blob" });
      const imageUrl = URL.createObjectURL(response.data);
      const imgElement = document.createElement("img");
      imgElement.src = imageUrl;
      imgElement.alt = "Flowchart";
      imgElement.className = "w-full h-auto mt-4";
      const flowChartDiv = document.getElementById("flowchart-div");
      flowChartDiv.innerHTML = "";
      flowChartDiv.appendChild(imgElement);
    } catch (error) {
      console.error("Failed to fetch image:", error);
    }
  };

  // Function to handle sending data to ChatGPT, assuming implementation exists
  const handleSendToChatGPT = () => {
    chrome.runtime.sendMessage({
      action: "navigateToChatGPT",
      topic: currentProblem.Topic,
    });
  };

  if (!currentProblem) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen p-4">
      <h1 className="text-3xl font-bold mb-10">DSA Revision Buddy</h1>
      <div className="flex flex-col items-start justify-start w-full max-w-4xl h-full overflow-auto p-4 bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-4 text-center">
          {currentProblem.Topic}
        </h2>
        <p className="mb-6 text-center" style={{ whiteSpace: "pre-wrap" }}>
          {currentProblem.Info.Definition}
        </p>
        <button
          onClick={() => setShowFlowChart(true)}
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700"
        >
          Click here to view the flowchart
        </button>
        {showFlowChart && (
          <div
            className="fixed top-0 right-0 w-1/2 h-full bg-white p-4 shadow-xl z-10 overflow-y-auto"
          >
            <button
              onClick={() => setShowFlowChart(false)}
              className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-700"
            >
              Close
            </button>
            <div id="flowchart-div"></div>
            {/* <img src={currentProblem.Info.imageLink} alt="Flowchart" className="w-full h-auto mt-4" /> */}
          </div>
        )}
        {Object.entries(currentProblem.Info.Algorithms || {}).map(
          ([key, value], index) => (
            <div key={index} className="mb-4 items-center w-full">
              <h3 className="text-xl font-semibold mb-2 text-center">{key}</h3>
              <pre className="bg-gray-100 rounded p-2 whitespace-pre-wrap text-center">
                {value}
              </pre>
            </div>
          )
        )}
        <div className="w-full text-center">
          <h3 className="text-2xl font-bold">Complexities</h3>
          {Object.entries(currentProblem.Info.Complexities || {}).map(
            ([key, values], index) => (
              <div key={index} className="mt-2">
                <h4 className="font-bold text-lg">{key}</h4>
                {typeof values === "object" ? (
                  <ul className="list-disc list-inside">
                    {Object.entries(values).map(
                      ([subKey, subValue], subIndex) => (
                        <li
                          key={subIndex}
                          className="text-md"
                        >{`${subKey}: ${subValue}`}</li>
                      )
                    )}
                  </ul>
                ) : (
                  <p>{values}</p>
                )}
              </div>
            )
          )}
        </div>
        <div className="flex justify-between mt-5">
          <button
            onClick={handlePrev}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Prev
          </button>
          <button
            onClick={handleNext}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-[480px]"
          >
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
