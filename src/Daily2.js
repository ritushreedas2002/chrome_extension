import React, { useState, useEffect } from "react";
import gfg from "./assests/gfg.png";
import axios from "axios";
const Daily2 = () => {
  const [problemData, setProblemData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const url = "https://leetcode.com/graphql";
  const headers = {
    "Content-Type": "application/json",
  };
  const data = {
    query: `
    query questionOfToday {
      activeDailyCodingChallengeQuestion {
        date
        userStatus
        link
        question {
          acRate
          difficulty
          freqBar
          frontendQuestionId: questionFrontendId
          isFavor
          paidOnly: isPaidOnly
          status
          title
          titleSlug
          hasVideoSolution
          hasSolution
          topicTags {
            name
            id
            slug
          }
        }
      }
    }
  `,
    operationName: "questionOfToday",
  };

  useEffect(() => {
    axios
      .post(url, data, { headers })
      .then((response) => {
        setProblemData(response.data);
        console.log(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "700px",
        height: "500px",
      }}
    >
      <div className="absolute font-bold top-12 text-2xl mb-20">
        DSA Revision Buddy
      </div>
      <div className=" p-4 bg-slate-400 rounded-lg w-[80%] ">
        <div className=" text-start text-xl font-bold text-white">
          Daily Coding Challenge
        </div>
        {problemData && (
          <div>
            <img src={gfg} className="w-10 h-8 absolute top-40" alt="gfg" />
            <p className=" text-white text-base font-semibold text-start">
              Title:{" "}
              {problemData?.data?.activeDailyCodingChallengeQuestion?.link}
            </p>
            <p className=" text-white text-base font-semibold text-start">
              {/* Difficulty: {problemData.difficulty} */}
            </p>
            <button className=" text-white text-base bg-blue-500 p-2 font-semibold rounded-lg ">
              Link:
              {/* <a
                href={problemData.problem_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Solve Challenge
              </a> */}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Daily2;
