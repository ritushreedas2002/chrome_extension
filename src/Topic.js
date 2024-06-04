import { Link, useNavigate, useParams } from "react-router-dom";
import cquestions from "./questions.json";
import { IoChevronBackCircleOutline } from "react-icons/io5";
const Topic = () => {
  const { index } = useParams(); // Destructure the index from useParams
  const topics = cquestions[index]?.topics || []; // Access topics based on index, handle edge case if index doesn't exist
  const navigate=useNavigate();
  return (
    <div
      className=" bg-[#0A2342]"
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
      <div className="absolute font-bold top-12 text-2xl mb-20  text-white">Topics</div>
      <div className=" flex justify-around w-[90%] mt-7">
        <div
          className="buttons-container flex flex-wrap"
          style={{ marginTop: "20px" }}
        >
          {topics.map((topic, topicIndex) => (
            <button key={topicIndex} className="p-4 m-2 w-48 text-lg font-semibold bg-green-600 text-white rounded-lg hover:bg-green-700" onClick={()=>{navigate(`/quiz/${index}/${topicIndex}`)}}>
              {topic.topic}
            </button>
          ))}
        </div>
      </div>
      <Link to="/quiz">
          <button className="fixed left-4 bottom-4 bg-[#479d6b] hover:bg-[#31744d] text-white text-lg font-bold p-2 rounded-lg transition-transform duration-100 cursor-pointer hover:scale-110">
            <IoChevronBackCircleOutline />
          </button>
        </Link>
    </div>
  );
};
export default Topic;
