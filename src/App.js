import React, { useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Counter from './Calculate';

function App() {
  // Initialize the counter state to 0
  // const [count, setCount] = useState(0);

  // // Function to increment the counter
  // const increment = () => setCount(count + 1);

  // // Function to decrement the counter
  // const decrement = () => setCount(count - 1);

  // // Function to reset the counter
  // const reset = () => setCount(0);

  return (
    <div className="App" style={{ width: '500px', height: '400px' }}>

      {/* <h2>Counter: {count}</h2>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <button onClick={reset}>Reset</button> */}
      <ul>
        <l1>
          <a href="#/">Home</a>
          <a href="#/about">Home</a>
        </l1>
      </ul>

      {/* <Routes>
        
        <Route path="/" element={<Counter/>} />
        
      </Routes> */}
    
    </div>
  );
}

export default App;
