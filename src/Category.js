
// import { useNavigate } from "react-router-dom";
// import dsa from "./dsa.json";
// import { useIndex } from './Context/Context';

// const Category = () => {
//     let navigate = useNavigate();
//   const { incrementIndex } = useIndex();

//   const handleReviseClick = () => {
//     incrementIndex();
//   }
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

//       <div className="flex flex-col justify-center items-center" style={{ maxWidth: "70%" }}>
//         {dsa.map((item, index) => (
//           <button className="p-4 m-4 w-48 text-xl font-semibold bg-blue-500 text-white rounded-lg" key={index}>
//             {item.category}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Category;
// Category.js
// components/Category.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useIndex } from './Context/Context';
import dsa from './dsa.json'; // Make sure the path is correct

const Category = () => {
  let navigate = useNavigate();
  const { incrementIndex } = useIndex();

  const handleCategorySelect = (category) => {
    const categoryData = dsa.find(cat => cat.category === category);
    if (!categoryData) {
      console.error('Category not found');
      return;
    }
    incrementIndex(category, categoryData.Problems.length);
    console.log(categoryData.Problems.length);
    navigate(`/revise/${category}`);
  };

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
      <div
        className="flex flex-col justify-center items-center"
        style={{ maxWidth: "70%" }}
      >
       
      {dsa.map((cat, index) => (
        <button key={index} className="p-4 m-4 w-48 text-xl font-semibold bg-blue-500 text-white rounded-lg" onClick={() => handleCategorySelect(cat.category)}>
          {cat.category}
        </button>
      ))}
      </div>
    </div>
  );
};

export default Category;

