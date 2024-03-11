chrome.runtime.onMessage.addListener(
  function ({topic}, sender, sendResponse) {
      console.log(topic);
      const textArea = document.querySelector('#prompt-textarea');
      textArea.value = `Find 5 questions about ${topic} according to each difficulty level : Easy, Medium, Hard. Show only the questions in a list format.\n `;
  }
)