import React, { useState } from "react";
import "./App.css";
import { Route, Router, Routes } from "react-router-dom";
import Calculate from "./Calculate";
function App() {
  // Initialize the counter state to 0
  const [count, setCount] = useState(0);

  // Function to increment the counter
  const increment = () => setCount(count + 1);

  // Function to decrement the counter
  const decrement = () => setCount(count - 1);

  // Function to reset the counter
  const reset = () => setCount(0);

  return (
    <div className="App" style={{ width: "500px", height: "400px" }}>
      This is the extension
      {/* <h2>Counter: {count}</h2>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <button onClick={reset}>Reset</button> */}
      {/* <Router>
      <Routes>
        
        <Route path="/" element={<Calculate/>} />
        
      </Routes>
    </Router> */}
    </div>
  );
}

export default App;
