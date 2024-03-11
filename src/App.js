import React, { useState } from "react";
import "./App.css";
import { Link, Route, Routes } from "react-router-dom";
import Revision from "./Revise";
import Home from "./Home";
import DailyChallenge from "./DailyChallenge";

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
        </Routes>
      </div>
    </div>
  );
}

export default App;
