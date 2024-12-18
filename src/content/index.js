// Content script - handles page-specific blocking
console.log('AdBlocker content script loaded');
// Add your ad blocking logic here
// src/content/index.js

// Common ad-related class names and IDs
const AD_PATTERNS = [
    'ad-', 'ad_', 'ads-', 'ads_', 'advert', 'advertisement',
    'banner', 'sponsor', 'promo', 'promoted', 'marketing',
    'gpt-ad', 'dfp-ad'
];

// Common ad-related keywords for URL matching
const AD_URLS = [
    'ads', 'ad', 'banner', 'pop', 'tracking',
    'doubleclick.net', 'adserver', 'adsystem',
    'analytics', 'tracker', 'sponsor'
];

class AdBlocker {
    constructor() {
        this.blockedCount = 0;
        this.isEnabled = true;
        this.whitelist = [];
        
        // Initialize
        this.init();
    }

    async init() {
        // Load settings from storage
        const settings = await chrome.storage.local.get({
            enabled: true,
            whitelist: []
        });
        
        this.isEnabled = settings.enabled;
        this.whitelist = settings.whitelist;

        if (this.isEnabled && !this.isWhitelisted(window.location.hostname)) {
            this.initializeObserver();
            this.cleanAds();
            this.blockAdRequests();
        }
    }

    isWhitelisted(domain) {
        return this.whitelist.some(url => domain.includes(url));
    }

    initializeObserver() {
        // Create a MutationObserver to watch for dynamically added elements
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 1) { // Element node
                        this.checkElement(node);
                    }
                });
            });
        });

        // Start observing
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    checkElement(element) {
        // Check if element matches ad patterns
        if (this.isAd(element)) {
            this.removeAd(element);
            return;
        }

        // Check children
        const children = element.querySelectorAll('*');
        children.forEach(child => {
            if (this.isAd(child)) {
                this.removeAd(child);
            }
        });
    }

    isAd(element) {
        // Check class names and IDs
        const elementClasses = Array.from(element.classList || []);
        const elementId = element.id || '';
        
        // Check for ad patterns in class names and IDs
        const hasAdPattern = AD_PATTERNS.some(pattern => {
            return elementClasses.some(className => className.toLowerCase().includes(pattern)) ||
                   elementId.toLowerCase().includes(pattern);
        });

        // Check for ad-related attributes
        const hasAdAttribute = element.getAttribute('data-ad') ||
                             element.getAttribute('data-ads') ||
                             element.getAttribute('data-adservice');

        // Check iframe sources
        if (element.tagName === 'IFRAME') {
            const src = element.src.toLowerCase();
            if (AD_URLS.some(pattern => src.includes(pattern))) {
                return true;
            }
        }

        return hasAdPattern || hasAdAttribute;
    }

    removeAd(element) {
        try {
            element.remove();
            this.blockedCount++;
            this.updateStats();
        } catch (error) {
            console.error('Error removing ad:', error);
        }
    }

    async updateStats() {
        // Update block count in storage
        const stats = await chrome.storage.local.get({ totalBlocked: 0 });
        chrome.storage.local.set({
            totalBlocked: stats.totalBlocked + 1
        });

        // Notify the background script
        chrome.runtime.sendMessage({
            type: 'updateCounter',
            count: this.blockedCount
        });
    }

    blockAdRequests() {
        // Create script to intercept network requests
        const script = document.createElement('script');
        script.textContent = `
            // Override fetch for ad-related requests
            const originalFetch = window.fetch;
            window.fetch = async (...args) => {
                const url = args[0] instanceof Request ? args[0].url : args[0];
                if (${JSON.stringify(AD_URLS)}.some(pattern => url.toLowerCase().includes(pattern))) {
                    throw new Error('Ad request blocked');
                }
                return originalFetch.apply(this, args);
            };

            // Override XHR for ad-related requests
            const originalXHR = XMLHttpRequest.prototype.open;
            XMLHttpRequest.prototype.open = function(method, url, ...args) {
                if (${JSON.stringify(AD_URLS)}.some(pattern => url.toLowerCase().includes(pattern))) {
                    throw new Error('Ad request blocked');
                }
                return originalXHR.apply(this, [method, url, ...args]);
            };
        `;
        document.documentElement.appendChild(script);
    }
}

// Initialize the ad blocker
const adBlocker = new AdBlocker();