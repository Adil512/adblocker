// src/popup/index.js
document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('toggleButton');
    const statusText = document.getElementById('status');
    const blockCount = document.getElementById('blockCount');
    const optionsButton = document.getElementById('options');
    const reportButton = document.getElementById('report');

    // Load initial state
    chrome.storage.local.get(['enabled', 'blockCount'], (result) => {
        toggleButton.checked = result.enabled ?? true;
        blockCount.textContent = result.blockCount ?? 0;
        updateStatus(result.enabled ?? true);
    });

    // Toggle button handler
    toggleButton.addEventListener('change', () => {
        const enabled = toggleButton.checked;
        chrome.storage.local.set({ enabled });
        updateStatus(enabled);
    });

    // Options button handler
    optionsButton.addEventListener('click', () => {
        chrome.runtime.openOptionsPage();
    });

    // Report button handler
    reportButton.addEventListener('click', () => {
        chrome.tabs.create({
            url: 'https://github.com/yourusername/adblocker/issues/new'
        });
    });

    function updateStatus(enabled) {
        statusText.textContent = enabled ? 'Active' : 'Paused';
        statusText.className = `stat-value ${enabled ? 'status-active' : ''}`;
    }
});