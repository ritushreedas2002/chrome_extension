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
  if (alarm.name === "checkReminders") {
    checkAndShowReminders();
  }

});
// async function checkAndShowReminders() {
//   const userId = await getUserId();

//   try {
//     const reminders = await fetchRemindersForUser(userId);
    
//     // Ensure reminders is an array before proceeding
//     if (Array.isArray(reminders)) {
//       const now = new Date().getTime();

//       for (const reminder of reminders) {
//         const reminderTime = new Date(reminder.reminderDateTime).getTime();

//         if (reminderTime <= now) {
//           chrome.notifications.create(`reminder-${reminder._id}`, {
//             type: 'basic',
//             iconUrl: 'your_icon_url_here.png',
//             title: 'Reminder!',
//             message: reminder.taskText,
//             priority: 2
//           });
//         }
//       }
//     } else {
//       console.error('Fetched data is not an array.');
//     }
//   } catch (error) {
//     console.error('Error fetching reminders:', error);
//   }
// }

// async function getUserId() {
//   // Fetch the userId from chrome.storage.local
//   return new Promise((resolve, reject) => {
//     chrome.storage.sync.get(['userId'], function(result) {
//       if (result.userId) {
//         resolve(result.userId);
//       } else {
//         reject('User ID not found.');
//       }
//     });
//   });
// }

// async function fetchRemindersForUser(userId) {
//   // Fetch reminders from your backend or local storage
//   // Placeholder for fetching from backend
//   const response = await fetch(`https://nodemailer-opal.vercel.app/api/userInfo?userId=${userId}`);
//   const reminders = await response.json();
//   return reminders;
// }



async function checkAndShowReminders() {
  try {
    // Fetch the userId from chrome.storage.sync
    const userId = await new Promise((resolve, reject) => {
      chrome.storage.sync.get(['userId'], function(result) {
        if (result.userId) {
          resolve(result.userId);
        } else {
          reject('User ID not found.');
        }
      });
    });

    // Fetch reminders for the user from your backend
    const response = await fetch(`https://nodemailer-opal.vercel.app/api/userInfo?userId=${userId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch reminders');
    }
    const data = await response.json();

    // Check if the data received is an array of reminders
    if (Array.isArray(data.reminders) && data.reminders.length > 0) {
      const now = new Date().getTime();
  
      data.reminders.forEach(reminder => {
        const reminderTime = new Date(reminder.reminderDateTime).getTime();
  
        // Check if the reminder's time is past or present
        if (reminderTime <= now) {
          // Create a browser notification for the reminder
          chrome.notifications.create(`reminder-${reminder._id}`, {
            type: 'basic',
            iconUrl: 'https://cdn-icons-png.flaticon.com/512/4436/4436481.png', // Make sure the icon URL is accessible
            title: 'Reminder!',
            message: `You task is pending -${reminder.taskText}`,
            silent: false
          });
        }
      });
    } else {
      console.error('Expected an array of reminders, received:', data.reminders);
    }
  } catch (error) {
    console.error('Error fetching reminders:', error);
  }
}

// You might need




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

// chrome.runtime.onInstalled.addListener(() => {
//   chrome.storage.sync.get(['userId'], (result) => {
//     if (!result.userId) {
//       // Generate a unique ID for the user
//       const userId = generateUserId();

//       // Store the generated userId
//       chrome.storage.sync.set({ userId: userId }, () => {
//         console.log('User ID is set to ', userId);
//       });
//     } else {
//       console.log('User ID already exists: ', result.userId);
//     }
//   });
// });
chrome.runtime.onInstalled.addListener(() => {
  chrome.alarms.create("checkReminders", { delayInMinutes: 2,
    periodInMinutes: 2 });
  chrome.storage.sync.get(['userId'], (result) => {
    if (!result.userId) {
      // Generate a unique ID for the user
      const userId = generateUserId();

      // Store the generated userId
      chrome.storage.sync.set({ userId: userId }, () => {
        console.log('User ID is set to ', userId);
      });
    } else {
      console.log('User ID already exists: ', result.userId);
    }
  });
})

function generateUserId() {
  // Generate a UUID (Universally Unique Identifier)
  return 'xxxx-xxxx-4xxx-yxxx-xxxx-yyyyxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}


// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  
// });

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'clearBadge') {
    // Clear the badge text
    chrome.action.setBadgeText({ text: '' });
  }
});
  

// background.js


