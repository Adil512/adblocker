// src/options/options.js
document.addEventListener('DOMContentLoaded', () => {
    // Get all form elements
    const form = {
        enableAdBlock: document.getElementById('enableAdBlock'),
        showCounter: document.getElementById('showCounter'),
        easyList: document.getElementById('easyList'),
        customFilters: document.getElementById('customFilters'),
        whitelistInput: document.getElementById('whitelistInput'),
        addWhitelist: document.getElementById('addWhitelist'),
        whitelistItems: document.getElementById('whitelistItems'),
        saveSettings: document.getElementById('saveSettings'),
        resetSettings: document.getElementById('resetSettings'),
        totalBlocked: document.getElementById('totalBlocked'),
        totalPages: document.getElementById('totalPages')
    };

    // Load saved settings
    loadSettings();

    // Event listeners
    form.addWhitelist.addEventListener('click', addWhitelistItem);
    form.saveSettings.addEventListener('click', saveSettings);
    form.resetSettings.addEventListener('click', resetSettings);

    function loadSettings() {
        chrome.storage.local.get({
            // Default settings
            enabled: true,
            showCounter: true,
            easyList: true,
            customFilters: false,
            whitelist: [],
            totalBlocked: 0,
            totalPages: 0
        }, (items) => {
            form.enableAdBlock.checked = items.enabled;
            form.showCounter.checked = items.showCounter;
            form.easyList.checked = items.easyList;
            form.customFilters.checked = items.customFilters;
            form.totalBlocked.textContent = items.totalBlocked;
            form.totalPages.textContent = items.totalPages;
            
            // Load whitelist items
            items.whitelist.forEach(url => {
                addWhitelistItemToDOM(url);
            });
        });
    }

    function addWhitelistItem() {
        const url = form.whitelistInput.value.trim();
        if (url) {
            addWhitelistItemToDOM(url);
            form.whitelistInput.value = '';
        }
    }

    function addWhitelistItemToDOM(url) {
        const li = document.createElement('li');
        li.innerHTML = `
            ${url}
            <button class="button" onclick="this.parentElement.remove()">Remove</button>
        `;
        form.whitelistItems.appendChild(li);
    }

    function saveSettings() {
        const whitelist = Array.from(form.whitelistItems.children).map(li => 
            li.textContent.trim().replace('Remove', '')
        );

        chrome.storage.local.set({
            enabled: form.enableAdBlock.checked,
            showCounter: form.showCounter.checked,
            easyList: form.easyList.checked,
            customFilters: form.customFilters.checked,
            whitelist: whitelist
        }, () => {
            showSaveConfirmation();
        });
    }

    function resetSettings() {
        if (confirm('Are you sure you want to reset all settings to default?')) {
            chrome.storage.local.set({
                enabled: true,
                showCounter: true,
                easyList: true,
                customFilters: false,
                whitelist: []
            }, () => {
                loadSettings();
                showSaveConfirmation('Settings reset to default');
            });
        }
    }

    function showSaveConfirmation(message = 'Settings saved successfully') {
        const confirmation = document.createElement('div');
        confirmation.className = 'save-confirmation';
        confirmation.textContent = message;
        document.body.appendChild(confirmation);
        
        setTimeout(() => {
            confirmation.remove();
        }, 2000);
    }
});