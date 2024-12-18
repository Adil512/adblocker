// src/background/index.js

// Initialize extension state
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({
        enabled: true,
        totalBlocked: 0,
        totalPages: 0,
        whitelist: [],
        lastUpdate: Date.now()
    });
});

// Listen for messages from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'updateCounter') {
        updateBadge(message.count);
    }
});

// Update badge when tab is updated
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete') {
        incrementPageCount();
    }
});

function updateBadge(count) {
    // Update extension badge with block count
    chrome.action.setBadgeText({
        text: count.toString()
    });
    chrome.action.setBadgeBackgroundColor({
        color: '#2196F3'
    });
}

async function incrementPageCount() {
    const stats = await chrome.storage.local.get({ totalPages: 0 });
    chrome.storage.local.set({
        totalPages: stats.totalPages + 1
    });
}

// Check for filter list updates
async function updateFilterLists() {
    const lastUpdate = await chrome.storage.local.get({ lastUpdate: 0 });
    const now = Date.now();
    
    // Update filter lists every 24 hours
    if (now - lastUpdate.lastUpdate > 24 * 60 * 60 * 1000) {
        // Implement filter list update logic here
        chrome.storage.local.set({ lastUpdate: now });
    }
}

// Schedule filter list updates
setInterval(updateFilterLists, 60 * 60 * 1000); // Check every hour