import React, { useState } from "react";
import "./App.css";
import { Link, Route, Routes } from "react-router-dom";
import Revision from "./Revise";
import Home from "./Home";
import DailyChallenge from "./DailyChallenge";
import Quizzes from "./Quizzes";
import QuizPage from "./QuizPage";
import Topic from "./Topic";
import TrackProgress from "./TrackProgress";

function App() {
  return (
    <div className="App" style={{ width: "700px", height: "500px" }}>
      {/* <div className="font-bold -mt-20 text-2xl mb-20">DSA Revision Buddy</div> */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/revise" element={<Revision />} />
          <Route path="/dailychallenge" element={<DailyChallenge />} />
          <Route path="/quiz" element={<Quizzes />} />
          <Route path="/quiz/:index" element={<Topic/>} />
          <Route path="/quiz/:index/:topicindex" element={<QuizPage/>}/>
          {/* <Route path="/trackprogress" element={<TrackProgress/>}/> */}
        </Routes>
      </div>
    </div>
  );
}

export default App;
