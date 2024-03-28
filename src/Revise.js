import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import dsa from "./dsa.json";
import { useIndex } from "./Context/Context";
import axios from "axios";

const Revision = () => {
  // const { category } = useParams();
  // const { indices } = useIndex();
  // const initialIndex = indices[category] || 0; // Get initial index from context, default to 0
  // const [currentIndex, setCurrentIndex] = useState(initialIndex);
  // const [currentProblem, setCurrentProblem] = useState(null);
  // const [showFlowChart, setShowFlowChart] = useState(false);

  // useEffect(() => {
  //   const categoryData = dsa.find((cat) => cat.category === category);
  //   if (!categoryData) {
  //     console.error("Category not found");
  //     return;
  //   }
  //   const problem = categoryData.Problems[currentIndex];
  //   setCurrentProblem(problem);
  // }, [category, currentIndex]);

  // const handlePrev = () => {
  //   setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0)); // Ensure index doesn't go below 0
  // };

  // const handleNext = () => {
  //   const categoryData = dsa.find((cat) => cat.category === category);
  //   setCurrentIndex((prevIndex) =>
  //     Math.min(prevIndex + 1, categoryData.Problems.length - 1)
  //   ); // Ensure index doesn't exceed max
  // };

  const { category } = useParams();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentProblem, setCurrentProblem] = useState(null);
  const [showFlowChart, setShowFlowChart] = useState(false);

  // Fetch and update the problem based on the current index
  useEffect(() => {
    const storedIndex = localStorage.getItem(category);
    const initialIndex = storedIndex ? parseInt(storedIndex, 10) - 1 : 0;
    setCurrentIndex(initialIndex);

    // This part of the effect handles fetching the problem data
    const categoryData = dsa.find((cat) => cat.category === category);
    if (categoryData && categoryData.Problems.length > initialIndex) {
      const problem = categoryData.Problems[initialIndex];
      setCurrentProblem(problem);
    } else {
      console.error("Category not found or no problems available");
    }
  }, [category, currentIndex]);

  // Handle previous problem navigation
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = Math.max(prevIndex - 1, 0);
      localStorage.setItem(category, newIndex + 1);
      return newIndex;
    });
  };

  // Handle next problem navigation
  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      const categoryData = dsa.find((cat) => cat.category === category);
      const newIndex = Math.min(
        prevIndex + 1,
        categoryData.Problems.length - 1
      );
      localStorage.setItem(category, newIndex + 1);
      return newIndex;
    });
  };

  useEffect(() => {
    if (currentProblem && showFlowChart) {
      fetchFlowchartImage(currentProblem.Info.imageLink);
    }
  }, [currentProblem, showFlowChart]);

  // const fetchFlowchartImage = async (imageLink) => {
  //   try {
  //     const response = await axios.get(imageLink, { responseType: "blob" });
  //     const imageUrl = URL.createObjectURL(response.data);
  //     const imgElement = document.createElement("img");
  //     imgElement.src = imageUrl;
  //     imgElement.alt = "Flowchart";
  //     imgElement.className = "w-full h-auto mt-4";
  //     const flowChartDiv = document.getElementById("flowchart-div");
  //     flowChartDiv.innerHTML = "";
  //     flowChartDiv.appendChild(imgElement);
  //   } catch (error) {
  //     console.error("Failed to fetch image:", error);
  //   }
  // };
  const fetchFlowchartImage = async (imageLinks) => {
    try {
      const flowChartDiv = document.getElementById("flowchart-div");
      flowChartDiv.innerHTML = "";
  
      for (let i = 0; i < imageLinks.length; i++) {
        const response = await axios.get(imageLinks[i], { responseType: "blob" });
        const imageUrl = URL.createObjectURL(response.data);
        const imgElement = document.createElement("img");
        imgElement.src = imageUrl;
        imgElement.alt = "Flowchart";
        imgElement.className = "w-full h-auto mt-4";
        flowChartDiv.appendChild(imgElement);
      }
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
        <div className="text-2xl font-bold mb-4 text-center">
          {currentProblem.Topic}
        </div>
        <p
          className="mb-6 text-left text-base font-medium"
          style={{ whiteSpace: "pre-wrap" }}
        >
          {currentProblem.Info.Definition}
        </p>
        <button
          onClick={() => setShowFlowChart(true)}
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700"
        >
          Click here to view the flowchart
        </button>
        {showFlowChart && (
          <div className="fixed top-0 right-0 w-5/6 h-full bg-white p-4 shadow-xl z-10 overflow-y-auto">
            <button
              onClick={() => setShowFlowChart(false)}
              className="px-4 py-2 text-white bg-red-500 rounded-xl hover:bg-red-700"
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
              <pre className="bg-gray-100 rounded pl-4 py-3 whitespace-pre-wrap text-left text-lg font-medium">
                {value}
              </pre>
            </div>
          )
        )}       
        <div className="w-full  ">
        <div className="text-2xl text-center font-bold m-1 ">Complexities</div>
          {Object.entries(currentProblem.Info.Complexities || {}).map(
            ([key, values], index) => (
              <div key={index} className="mt-2 ml-10">
                <h4 className="font-bold text-left mb-2 text-xl">{key}</h4>
                {typeof values === "object" ? (
                  <ul className="list-disc list-inside">
                    {Object.entries(values).map(
                      ([subKey, subValue], subIndex) => (
                        <li
                          key={subIndex}
                          className="text-base text-left mb-1"
                        >{`${subKey}: ${subValue}`}</li>
                      )
                    )}
                  </ul>
                ) : (
                  <div className=" text-base text-left mb-1">{values}</div>
                )}
              </div>
            )
          )}
        </div>
        <div className="flex justify-start mt-5">
          <button
            onClick={handlePrev}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-4 rounded focus:outline-none focus:shadow-outline"
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
