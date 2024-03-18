import React, { useState, useEffect } from "react";
import gfg from "./assests/gfg.png";
import axios from "axios";

const DailyChallenge = () => {
  const [problemData, setProblemData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [problemData2, setProblemData2] = useState(null);
  const [loading2, setLoading2] = useState(true);
  const [error2, setError2] = useState("");
  const [urllink, setUrllink] = useState("");

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

  useEffect(() => {
    axios
      .post(url, data, { headers })
      .then((response) => {
        setProblemData2(response.data);
        setUrllink(
          "https://leetcode.com" +
            response.data?.data?.activeDailyCodingChallengeQuestion?.link +
            "description/?envType=daily-question&envId=" +
            response.data?.data?.activeDailyCodingChallengeQuestion?.date
        );
        console.log(response.data);
        setLoading2(false);
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  }, []);

  if (loading || loading2) return <div>Loading...</div>;
  if (error || error2) return <div>Error: {error}</div>;

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
      <div className=" p-4   rounded-lg w-[80%] ">
        <div className="mb-6 bg-slate-400 p-4 rounded-lg">
          <div className=" text-start text-xl font-bold  text-white">
            GeeksforGeeks Problem Of The Day
          </div>
          {problemData && (
            <div className=" flex">
              <img src={gfg} className="w-10 h-12 mr-16 rounded-md" alt="geeks" />
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
            </div>
          )}
        </div>
        <div className=" bg-slate-400 p-4 rounded-lg">
          <div className=" text-start text-xl  font-bold text-white">
            Leetcode Daily Coding Challenge
          </div>
          {problemData2 && (
            <div>
              <img src={gfg} className="w-10 h-8 absolute top-40" alt="gfg" />
              <p className=" text-white text-base font-semibold text-start">
                Title:{" "}
                {
                  problemData2?.data?.activeDailyCodingChallengeQuestion
                    ?.question?.title
                }
              </p>
              <p className=" text-white text-base font-semibold text-start">
                Difficulty:{" "}
                {
                  problemData2?.data?.activeDailyCodingChallengeQuestion
                    ?.question?.difficulty
                }
              </p>
              <button className=" text-white text-base bg-blue-500 p-2 font-semibold rounded-lg ">
                Link:
                <a href={urllink} target="_blank" rel="noopener noreferrer">
                  Solve Challenge
                </a>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DailyChallenge;

// // import React, { useState, useEffect } from "react";
// // import axios from 'axios';
// // import gfg from "./assests/gfg.png"
// // const DailyChallenge = () => {
// //   const [leetcodeProblem, setLeetcodeProblem] = useState(null);
// //   const [gfgProblem, setGfgProblem] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState("");

// //   useEffect(() => {
// //     const fetchLeetCodeProblem = async () => {
// //   //     const url = 'https://leetcode.com/graphql';
// //   //     const headers = {
// //   //       'Content-Type': 'application/json',
// //   //     };
// //   //     const data = {
// //   //       query: `
// //   //         query questionOfToday {
// //   //           activeDailyCodingChallengeQuestion {
// //   //             date
// //   //             userStatus
// //   //             link
// //   //             question {
// //   //               acRate
// //   //               difficulty
// //   //               freqBar
// //   //               frontendQuestionId: questionFrontendId
// //   //               isFavor
// //   //               paidOnly: isPaidOnly
// //   //               status
// //   //               title
// //   //               titleSlug
// //   //               hasVideoSolution
// //   //               hasSolution
// //   //               topicTags {
// //   //                 name
// //   //                 id
// //   //                 slug
// //   //               }
// //   //             }
// //   //           }
// //   //         }
// //   //       `,
// //   //       operationName: 'questionOfToday',
// //   //       variables: {}
// //   //     };

// //   //     axios.post(url, data, { headers })
// //   // .then(response => {
// //   //   const questionname = response.data.data.activeDailyCodingChallengeQuestion.question.title;
// //   //   const difficulty=response.data.data.activeDailyCodingChallengeQuestion.question.difficulty;
// //   //   const link=response.data.data.activeDailyCodingChallengeQuestion.link;

// //   //   console.log(questionname +" "+difficulty+" "+link);
// //   //   // console.log(response.data.activeDailyCodingChallengeQuestion.link);
// //   // })
// //   // .catch(error => {
// //   //   console.error('Error:', error.message);
// //   // });

//   fetch('http://localhost:5000/leetcode-daily-question')
//   .then(response => response.json())
//   .then(data => {
//     console.log(data);
//     // Use the data in your application
//   })
//   .catch(error => {
//     console.error('Error fetching from backend:', error);
//   });
//     };

//     const fetchGfgProblem = async () => {
//       try {
//         const response = await fetch(
//           "https://practiceapi.geeksforgeeks.org/api/vr/problems-of-day/problem/today/"
//         );
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data = await response.json();
//         setGfgProblem(data);
//       } catch (error) {
//         console.error("GFG Fetching error:", error);
//         setError(error.message);
//       }
//     };

//     fetchLeetCodeProblem();
//     fetchGfgProblem().then(() => setLoading(false));
//   }, []);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

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
//       <div className="p-4 bg-slate-400 rounded-lg w-[80%]">
//         <div className="text-start text-xl font-bold text-white">
//           Daily Coding Challenge
//         </div>
//         {/* {leetcodeProblem && (
//           <div>
//             <p className="text-white text-base font-semibold text-start">
//               LeetCode - Title: {leetcodeProblem.title}
//             </p>
//             <p className="text-white text-base font-semibold text-start">
//               Difficulty: {leetcodeProblem.difficulty}
//             </p>
//             <button className="text-white text-base bg-blue-500 p-2 font-semibold rounded-lg">
//               Link:
//               <a href={leetcodeProblem.link} target="_blank" rel="noopener noreferrer">
//                 Solve Challenge
//               </a>
//             </button>
//           </div>
//         )} */}
//         {gfgProblem && (
//           <div>
//             <p className="text-white text-base font-semibold text-start">
//               GFG - Title: {gfgProblem.problem_name}
//             </p>

//             <p className="text-white text-base font-semibold text-start">
//               Difficulty: {gfgProblem.difficulty}
//             </p>
//             <button className="text-white text-base bg-blue-500 p-2 font-semibold rounded-lg">
//               Link:
//               <a href={gfgProblem.problem_url} target="_blank" rel="noopener noreferrer">
//                 Solve Challenge
//               </a>
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DailyChallenge;
