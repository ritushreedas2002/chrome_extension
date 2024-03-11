import React, { useState } from "react";

const Revision = () => {
  const topic = "Binary Search";

  const handleSendToChatGPT = () => {
    // Sending a message to the background script
    chrome.runtime.sendMessage({
      // action: "searchChatGPT",
      topic: topic,
    });
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
        className="flex flex-wrap justify-center items-center"
        style={{ maxWidth: "70%" }}
      >
        {topic}
      </div>
      <button
        onClick={handleSendToChatGPT}
        className="p-2 bg-blue-500 text-white rounded-lg mt-5"
      >
        Send to ChatGPT
      </button>
    </div>
  );
};

export default Revision;
