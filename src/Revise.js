import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import dsa from "./dsa.json";
import axios from "axios";
import DialogBox from "./DialogBox";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import { IoChevronForwardCircleOutline } from "react-icons/io5";

const Revision = () => {
  const { category } = useParams();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentProblem, setCurrentProblem] = useState(null);
  const [showFlowChart, setShowFlowChart] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [explanation, setExplanation] = useState("");
  const [loadingExplanation, setLoadingExplanation] = useState(false);
  const [categorylist, setcategorylist] = useState([]);
  const [modalContent, setModalContent] = useState("");
  const [completedTopics, setCompletedTopics] = useState([]);
  useEffect(() => {
    // Retrieve the completedTopics from localStorage
    const storedCompletedTopicsJSON = localStorage.getItem(`${category}completedTopics`);
    const storedCompletedTopics = storedCompletedTopicsJSON ? JSON.parse(storedCompletedTopicsJSON) : [];
    
    setCompletedTopics(storedCompletedTopics);
  }, []);
  
  
  const changeProblem = (index) => {
    console.log(index);
    setCurrentIndex(index + 1);
    setShowFlowChart(false); // Close the modal
    localStorage.setItem(category, index + 1);
  };
  const getExplanation = async (topicName, codeText) => {
    console.log(codeText);
    console.log(topicName);
    setLoadingExplanation(true);

    try {
      const response = await fetch("https://gptserver.vercel.app/api/openai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topicName, codeText }), // Ensure this matches the server's expected format
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data);
      setExplanation(data);
    } catch (error) {
      console.error("Error fetching explanation:", error);
      setExplanation("Failed to fetch the explanation.");
    } finally {
      setLoadingExplanation(false);
      setIsDialogOpen(true);
    }
  };

  // Fetch and update the problem based on the current index
  useEffect(() => {
    const storedIndex = localStorage.getItem(category);
    const initialIndex = storedIndex ? parseInt(storedIndex, 10) - 1 : 0;
    setCurrentIndex(initialIndex);

    // Retrieve completed topics from local storage
    // const storedCompletedTopics =
    //   JSON.parse(localStorage.getItem("completedTopics")) || [];
    // setCompletedTopics(storedCompletedTopics);

    // This part of the effect handles fetching the problem data
    const categoryData = dsa.find((cat) => cat.category === category);
    if (categoryData && categoryData.Problems.length > initialIndex) {
      const problem = categoryData.Problems[initialIndex];
      setCurrentProblem(problem);
    } else {
      console.error("Category not found or no problems available");
    }

    if (categoryData && categoryData.Problems.length > 0) {
      setcategorylist(categoryData.Problems);
    } else {
      // Reset to empty array if no problems found
      setcategorylist([]);
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
    if (currentProblem && showFlowChart && modalContent === "Flowchart") {
      fetchFlowchartImage(currentProblem.Info.imageLink);
    }
  }, [currentProblem, showFlowChart, modalContent]);

  const fetchFlowchartImage = async (imageLinks) => {
    try {
      const flowChartDiv = document.getElementById("flowchart-div");
      flowChartDiv.innerHTML = "";

      for (let i = 0; i < imageLinks.length; i++) {
        const response = await axios.get(imageLinks[i], {
          responseType: "blob",
        });
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
    return (
      <div>
        <h1>No problem exits</h1>
      </div>
    );
  }

  // const markAsCompleted = (topic) => {
  //   const updatedCompletedTopics = [...completedTopics, topic];
  //   setCompletedTopics(updatedCompletedTopics);
  //   console.log(updatedCompletedTopics);
  //   localStorage.setItem("completedTopics", JSON.stringify(updatedCompletedTopics));
  // };

  const markAsCompleted = (topic) => {
    setCompletedTopics((prevCompletedTopics) => {
      let updatedCompletedTopics;
  
      if (prevCompletedTopics.includes(topic)) {
        // If the topic is already marked as completed, remove it
        updatedCompletedTopics = prevCompletedTopics.filter(t => t !== topic);
      } else {
        // Otherwise, add it to the completed topics
        updatedCompletedTopics = [...prevCompletedTopics, topic];
      }
  
      // Persist the updated list to localStorage
      localStorage.setItem(`${category}completedTopics`, JSON.stringify(updatedCompletedTopics));
  
      return updatedCompletedTopics;
    });
  };
  
  return (
    <div className="relative bg-[#0A2342] flex flex-col items-center justify-center w-full h-screen p-4">
      <h1 className="text-3xl text-white font-bold mb-4">AlgoAce</h1>
      <h2
        className="text-xl text-slate-500 font-bold mb-2 ml-[430px] cursor-pointer"
        onClick={() => {
          setShowFlowChart(true);
          setModalContent("ProblemList");
        }}
      >
        Know More
      </h2>
      <button
        onClick={() => {
          setShowFlowChart(true);
          setModalContent("Flowchart");
        }}
        className="absolute top-14 left-4 p-2 text-base font-semibold text-white bg-[#479d6b] hover:bg-[#31744d] rounded-lg "
      >
        View Flowchart
      </button>
      <div className="flex flex-col items-start justify-start w-full max-w-4xl h-full overflow-auto no-scrollbar p-4 bg-[#7ba0b3ac] rounded shadow">
        <div className="flex justify-between">
          <div className="text-2xl text-white font-bold mb-4 text-center">
            {currentProblem.Topic}
          </div>
        </div>
        <p
          className="mb-6 text-left text-white text-base font-medium"
          style={{ whiteSpace: "pre-wrap" }}
        >
          {currentProblem.Info.Definition}
        </p>
        <Link to="/revise">
          <button className="absolute left-5 bottom-5 z-10 bg-[#479d6b] hover:bg-[#31744d] text-white text-lg font-bold p-2 rounded-lg transition-transform duration-100 cursor-pointer hover:scale-110">
            <IoChevronBackCircleOutline />
          </button>
        </Link>
        {showFlowChart && (
          <div className="fixed top-0 right-0 w-5/6 h-full bg-[#2c4856ac] p-4 shadow-xl z-10 overflow-y-auto">
            <div
              id="flowchart-div"
              className=" bg-black flex-col justify-start "
            >
              {modalContent === "ProblemList" && (
                <div className="text-left p-4 ">
                  <h1 className="text-white text-2xl text-center">
                    List Of Algorithms
                  </h1>
                  {categorylist.map(
                    (
                      problem,
                      index // Correctly use 'map' here
                    ) => (
                      <li
                        className="ml-10 text-white cursor-pointer"
                        key={index}
                        onClick={() => {
                          changeProblem(index);
                        }}
                      >
                        {problem.Topic}
                      </li>
                    )
                  )}
                </div>
              )}
            </div>
            {/* <img src={currentProblem.Info.imageLink} alt="Flowchart" className="w-full h-auto mt-4" /> */}
            <button
              onClick={() => setShowFlowChart(false)}
              className=" px-4 py-2 text-white bg-red-500 rounded-xl hover:bg-red-700 ml-96 mb-3"
            >
              Close
            </button>
          </div>
        )}
        {Object.entries(currentProblem.Info.Algorithms || {}).map(
          ([key, value], index) => (
            <div key={index} className="mb-4 items-center w-full">
              <h3 className="text-xl text-white font-semibold mb-2 text-center">
                {key}
              </h3>

              {/* Dialog box */}
              {isDialogOpen && (
                <DialogBox
                  isOpen={isDialogOpen}
                  onClose={() => setIsDialogOpen(false)}
                >
                  {loadingExplanation ? (
                    <p>Loading...</p>
                  ) : (
                    <p>{explanation}</p>
                  )}
                </DialogBox>
              )}
              <div style={{ position: "relative" }}>
                <pre className="bg-gray-100 rounded pl-4 py-3 whitespace-pre-wrap text-left text-lg font-medium">
                  {value}
                  <button
                    onClick={() => getExplanation(key, value)}
                    className="absolute bottom-1.5 right-1.5 p-2 text-white text-base bg-blue-500 rounded-lg hover:bg-blue-700"
                  >
                    Explain the code
                  </button>
                </pre>
              </div>
            </div>
          )
        )}
        <div className="w-full  ">
          <div className="text-2xl text-white text-center font-bold m-1 ">
            Complexities
          </div>
          {Object.entries(currentProblem.Info.Complexities || {}).map(
            ([key, values], index) => (
              <div key={index} className="mt-2 ml-10">
                <h4 className="font-bold text-white text-left mb-2 text-xl">
                  {key}
                </h4>
                {typeof values === "object" ? (
                  <ul className="list-disc list-inside mb-10">
                    {Object.entries(values).map(
                      ([subKey, subValue], subIndex) => (
                        <li
                          key={subIndex}
                          className="text-base text-white text-left mb-1"
                        >{`${subKey}: ${subValue}`}</li>
                      )
                    )}
                  </ul>
                ) : (
                  <div className=" text-base text-white text-left mb-10">
                    {values}
                  </div>
                )}
              </div>
            )
          )}
        </div>
        <div className="">
          <button
            onClick={handlePrev}
            className="absolute bottom-5 right-[64px] text-2xl bg-[#0A2342] hover:bg-[#0a2342bf] text-white font-bold p-2 rounded-full "
          >
            <IoChevronBackCircleOutline />
          </button>
          <button
            onClick={handleNext}
            className="absolute bottom-5 right-5 text-2xl bg-[#0A2342] hover:bg-[#0a2342bf] text-white font-bold p-2 rounded-full "
          >
            <IoChevronForwardCircleOutline />
          </button>
        </div>
        <button
          onClick={handleSendToChatGPT}
          className="absolute bottom-5 left-16 bg-[#479d6b] hover:bg-[#31744d] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-transform duration-100 cursor-pointer hover:scale-110"
        >
          Send to ChatGPT
        </button>
        <label className="text-white -mt-10">
          <input
            type="checkbox"
            onChange={() => markAsCompleted(currentProblem.Topic)}
            checked={completedTopics.some((t) => t === currentProblem.Topic)}
          />
          Mark as Completed?
        </label>
      </div>
    </div>
  );
};

export default Revision;
