chrome.runtime.onInstalled.addListener((detail) => {
  if (detail.reason === "install") {
    // chrome.storage.local.set({onboardingIsDone:false});
    // chrome.runtime.setUninstallURL('https://www.youtube.com');
    chrome.tabs.create({
      url: "./onboarding.html",
    });
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if(message.action==="navigateToChatGPT"){

  
  chrome.tabs.query({ url: "https://chat.openai.com/*" }, function (tabs) {
    // if (tabs.length === 0) {
      // No ChatGPT tab open, create a new one.
      chrome.tabs.create({ url: "https://chat.openai.com/" }, function (newTab) {
        // Wait for the new tab to be fully loaded
        chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo) {
          if (tabId === newTab.id && changeInfo.status === 'complete') {
            // Once loaded, send the message
            setTimeout(() => {
              chrome.tabs.sendMessage(newTab.id, message);
            }, 4000);
            chrome.tabs.onUpdated.removeListener(listener); // Remove listener to avoid duplicate triggers
          }
        });
      });
    // } else {
    //   // ChatGPT tab exists, focus it before sending a message
    //   const tab = tabs[0];
    //   chrome.tabs.update(tab.id, { active: true }, function(updatedTab) {
    //     // Wait a bit for the tab to gain focus and be ready
    //     setTimeout(() => {
    //       chrome.tabs.sendMessage(updatedTab.id, message);
    //     }, 500); // Adjust delay as needed
    //   });
    // }
  
  });
  sendResponse("From the background Script");
  return true; // Keep the message channel open for the async response
  // chrome.tabs.query({ active: true, currentWindow: true }, function (currentTabs) {
  //     const currentTab = currentTabs[0];
  
  //     if (currentTab.url && currentTab.url.includes("chat.openai.com")) {
  //       // Current tab is ChatGPT, send the message here
  //       chrome.tabs.update(currentTab.id, { active: true }, function(currentTab) {
  //         // Wait a bit for the tab to gain focus and be ready
  //         setTimeout(() => {
  //           chrome.tabs.sendMessage(currentTab.id, message);
  //         }, 500); // Adjust delay as needed
  //       });
  //     } else {
  //       // Current tab is not ChatGPT, create a new ChatGPT tab
  //       chrome.tabs.create({ url: "https://chat.openai.com/" }, function (newTab) {
  //         // Wait for the new tab to be fully loaded
  //         chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo) {
  //           if (tabId === newTab.id && changeInfo.status === 'complete') {
  //             // Once loaded, send the message
  //             setTimeout(() => {
  //               chrome.tabs.sendMessage(newTab.id, message);
  //             }, 2000); // Wait a bit to ensure the page is ready
  //             chrome.tabs.onUpdated.removeListener(listener); // Remove listener to avoid duplicate triggers
  //           }
  //         });
  //       });
  //     }
  //   });
    
  //   sendResponse("From the background Script");
  //   return true;
}
});

  


  // background.js

// Set an alarm to trigger every day
chrome.alarms.create('updateBadge', { periodInMinutes: 1440 });

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'updateBadge') {
    updateBadge();
  }
});

// Function to update the badge
function updateBadge() {
  // Determine the badge text, e.g., showing the current day of the month
  const date = new Date();
  const dayOfMonth = date.getDate().toString();

  // Set the badge text to show the day
  chrome.action.setBadgeText({ text: '1'});

  // You can set the badge background color if needed
  chrome.action.setBadgeBackgroundColor({ color: '#FF0000' });

  // Logic to check whether you need to show or clear the badge can go here
  // For example, check the storage to see if the user has completed the daily task
  // background.js



}

//Initial badge setup when the extension is installed or reloaded
chrome.runtime.onInstalled.addListener(() => {
  updateBadge();
});

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  
// });

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'clearBadge') {
    // Clear the badge text
    chrome.action.setBadgeText({ text: '' });
  }
});


// background.js


