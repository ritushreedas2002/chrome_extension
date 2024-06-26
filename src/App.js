import React, { useEffect} from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Revision from "./Revise";
import Home from "./Home";
import DailyChallenge from "./DailyChallenge";
import Quizzes from "./Quizzes";
import QuizPage from "./QuizPage";
import Topic from "./Topic";
import QuizProgress from "./QuizProgress";
import { IndexProvider } from './Context/Context'
import Trackprogress from "./TrackProgress";
import QuizResult from "./QuizResult";
import Category from "./Category";
import Daily2 from "./Daily2";
import ToDoList from "./ToDoList";
import CompletedTasks from "./CompletedTasks";
import Backlog from "./Backlog";


function App() {
  

  useEffect(() => {
    //Send a message to the background script to clear the badge when the popup opens
    chrome.runtime.sendMessage({ action: 'clearBadge' });
  }, []);
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
        <IndexProvider>
        <Routes>
          
          <Route path="/" element={<Home />}/>
          <Route path="/revise" element={<Category/>}/>
          <Route path="/revise/:category" element={<Revision/>}/>
          <Route path="/dailychallenge" element={<DailyChallenge />} />
          <Route path="/dailychallenge2" element={<Daily2 />} />
          <Route path="/quiz" element={<Quizzes />} />
          <Route path="/quiz/:index" element={<Topic/>} />
          <Route path="/quiz/:index/:topicindex" element={<QuizPage/>}/>
          <Route path="/quizresult" element={<QuizResult />} />
          <Route path="/quizprogress" element={<QuizProgress/>}/>
          <Route path="/trackprogress" element={<Trackprogress/>}/>
          <Route path="/todo" element={<ToDoList/>}/>
          <Route path="/completed" element={<CompletedTasks />} />
          <Route path="/backlog" element={<Backlog />} />
         
        </Routes>
        </IndexProvider>
      </div>
    </div>
  );
}

export default App;
