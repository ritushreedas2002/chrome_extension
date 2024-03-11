import React, { useState, useEffect } from "react";

const DailyChallenge = () => {
  const [problemData, setProblemData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDailyProblem = async () => {
      try {
        const response = await fetch(
          "https://practiceapi.geeksforgeeks.org/api/vr/problems-of-day/problem/today/"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProblemData(data);
        setLoading(false);
      } catch (error) {
        console.error("Fetching error:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchDailyProblem();
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
            <p className=" text-white text-base font-semibold text-start">
              Title: {problemData.problem_name}
            </p>
            <p className=" text-white text-base font-semibold text-start">
              Difficulty: {problemData.difficulty}
            </p>
            <button className=" text-white text-base bg-blue-500 p-2 font-semibold rounded-lg ">
              Link:
              <a
                href={problemData.problem_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Solve Challenge
              </a>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DailyChallenge;
