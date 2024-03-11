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
    chrome.tabs.query({ url: "https://chat.openai.com/*" }, function (tabs) {
      if (tabs.length === 0) {
        // No ChatGPT tab open, create a new one.
        chrome.tabs.create({ url: "https://chat.openai.com/" }, function (newTab) {
          // Wait for the new tab to be fully loaded
          chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo) {
            if (tabId === newTab.id && changeInfo.status === 'complete') {
              // Once loaded, send the message
              setTimeout(() => {
                chrome.tabs.sendMessage(newTab.id, message);
              }, 2000);
              chrome.tabs.onUpdated.removeListener(listener); // Remove listener to avoid duplicate triggers
            }
          });
        });
      } else {
        // ChatGPT tab exists, focus it before sending a message
        const tab = tabs[0];
        chrome.tabs.update(tab.id, { active: true }, function(updatedTab) {
          // Wait a bit for the tab to gain focus and be ready
          setTimeout(() => {
            chrome.tabs.sendMessage(updatedTab.id, message);
          }, 500); // Adjust delay as needed
        });
      }
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
  });
  
