let currentTab = "";
let startTime = Date.now();

chrome.tabs.onActivated.addListener(async (activeInfo) => {
    let tab = await chrome.tabs.get(activeInfo.tabId);
    trackTime(tab.url);
});

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete" && tab.url) {
        trackTime(tab.url);
    }
});

function trackTime(url) {
    try {
        let hostname = new URL(url).hostname;

        if (currentTab) {
            let timeSpent = Date.now() - startTime;

            chrome.storage.local.get(["data"], (result) => {
                let data = result.data || {};

                if (!data[currentTab]) {
                    data[currentTab] = 0;
                }

                data[currentTab] += timeSpent;

                chrome.storage.local.set({ data });
            });
        }

        currentTab = hostname;
        startTime = Date.now();

    } catch (e) {
        // ignore invalid URLs (like chrome:// pages)
    }
}