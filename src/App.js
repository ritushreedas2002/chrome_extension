import React, { useState } from "react";
import "./App.css";
import { Link, Route, Routes } from "react-router-dom";
import Counter from "./Calculate";
import About from "./About";

function App() {
  return (
    <div className="App" style={{ width: "700px", height: "500px" }}>
      <div className=" font-bold mt-2 text-xl">DSA Extension</div>

      <div className=" flex flex-col">
        <Link to="/">
          <button className=" p-2 m-2 bg-blue-500 text-white rounded-lg">
            Home
          </button>
        </Link>
        <Link to="/about">
          <button className=" p-2 bg-blue-500 text-white rounded-lg">
            About
          </button>
        </Link>
      </div>

      <Routes>
        <Route path="/" element={<Counter />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
