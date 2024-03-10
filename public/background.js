chrome.runtime.onInstalled.addListener((detail) => {
    if (detail.reason === "install") {
        // chrome.storage.local.set({onboardingIsDone:false});

        // chrome.runtime.setUninstallURL('https://www.youtube.com');

        chrome.tabs.create({
            url:'./onboarding.html'
        });
    }
});