import { useNavigate, useParams } from "react-router-dom";
import cquestions from "./questions.json";
const Topic = () => {
  const { index } = useParams(); // Destructure the index from useParams
  const topics = cquestions[index]?.topics || []; // Access topics based on index, handle edge case if index doesn't exist
  const navigate=useNavigate();
  return (
    <div
      className=" bg-yellow-100"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "700px",
        height: "500px",
        position: "relative",
      }}
    >
      <div className="absolute font-bold top-12 text-2xl mb-20">Topics</div>
      <div className=" flex justify-around w-[90%] mt-7">
        <div
          className="buttons-container flex flex-wrap"
          style={{ marginTop: "20px" }}
        >
          {topics.map((topic, topicIndex) => (
            <button key={topicIndex} className="p-4 m-2 w-48 text-lg font-semibold bg-blue-500 text-white rounded-lg" onClick={()=>{navigate(`/quiz/${index}/${topicIndex}`)}}>
              {topic.topic}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Topic;
