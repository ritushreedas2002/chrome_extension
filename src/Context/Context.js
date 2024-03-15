// import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

// const IndexContext = createContext();

// export const IndexProvider = ({ children, totalTopics }) => {
//   // Initialize state from local storage, or set to 0 if not found
//   const [index, setIndex] = useState(() => {
//     const savedIndex = localStorage.getItem('currentIndex');
//     return savedIndex !== null ? parseInt(savedIndex, 10) : 0;
//   });

//   useEffect(() => {
//     // Update local storage whenever index changes
//     localStorage.setItem('currentIndex', index);
//   }, [index]);

//   const incrementIndex = useCallback(() => {
//     setIndex(prevIndex => (prevIndex + 1) % totalTopics);
//   }, [totalTopics]);

//   return (
//     <IndexContext.Provider value={{ index, incrementIndex }}>
//       {children}
//     </IndexContext.Provider>
//   );
// };

// export const useIndex = () => useContext(IndexContext);



// Context/IndexContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const IndexContext = createContext();

export const IndexProvider = ({ children }) => {
  const [indices, setIndices] = useState(() => {
    const savedIndices = localStorage.getItem('categoryIndices');
    return savedIndices ? JSON.parse(savedIndices) : { Easy: 0, Medium: 0, Hard: 0 };
  });

  useEffect(() => {
    localStorage.setItem('categoryIndices', JSON.stringify(indices));
  }, [indices]);

  const incrementIndex = (category, problemCount) => {
    setIndices(prevIndices => ({
      ...prevIndices,
      [category]: (prevIndices[category] + 1) % problemCount
    }));
  };

  return (
    <IndexContext.Provider value={{ indices, incrementIndex }}>
      {children}
    </IndexContext.Provider>
  );
};

export const useIndex = () => useContext(IndexContext);

