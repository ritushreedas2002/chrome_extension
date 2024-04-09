import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useIndex } from "./Context/Context";
import dsa from "./dsa.json";
import backgroundImage from './assests/prog4.png';
import { IoChevronBackCircleOutline } from "react-icons/io5";

const Category = () => {
  let navigate = useNavigate();
  const { incrementIndex } = useIndex();

  const handleCategorySelect = (category) => {
    const categoryData = dsa.find((cat) => cat.category === category);
    if (!categoryData) {
      console.error("Category not found");
      return;
    }
    incrementIndex(category, categoryData.Problems.length);
    //console.log(categoryData.Problems.length);
    navigate(`/revise/${category}`);
  };

  return (
    <div
      className="relative flex bg-[#0A2342]"
      style={{
        alignItems: "center",
        justifyContent: "center",
        width: "700px",
        height: "500px",
        // backgroundImage: `url(${backgroundImage})`,
        // backgroundSize: "cover"
      }}
    >
      <div
        className="absolute top-0 left-0 right-0 bottom-0 bg-[#0A2342] opacity-40"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
        }}
      ></div>
      <Link to="/">
          <button className="fixed left-4 bottom-4 bg-[#479d6b] hover:bg-[#31744d] text-white text-lg font-bold p-2 rounded-lg transition-transform duration-100 cursor-pointer hover:scale-110">
            <IoChevronBackCircleOutline />
          </button>
        </Link>
      <div className="z-10 text-white text-center w-[60%]  ml-10">
        <div className=" text-4xl font-bold mb-12">Revise Concepts</div>
        <div className=" text-xl font-semibold">
          Over 100+ Data Structures and Algorithms to revise, Choose your
          Difficulty and Start Revising
        </div>
      </div>
      <div className="z-10 flex flex-col justify-center items-center w-[40%]">
        {dsa.map((cat, index) => (
          <button
            key={index}
            className="p-4 my-2 w-48 text-xl font-semibold bg-[#479d6b] hover:bg-[#31744d] text-white rounded-3xl"
            onClick={() => handleCategorySelect(cat.category)}
          >
            {cat.category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Category;
