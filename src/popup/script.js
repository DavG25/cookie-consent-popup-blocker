/**
 * Get HTML elements
 */
const header = document.getElementById('header');
const warningMessage = document.getElementById('warningMessage');
const clickableMessage = document.getElementById('clickableMessage');

/**
 * Handle message click event to make sure popup window closes
 */
clickableMessage.onclick = (event) => {
  if (!event.ctrlKey && !event.shiftKey) {
    event.preventDefault();
    chrome.tabs.create({ url: event.target.href });
    window.close();
  }
};

/**
 * Dynamically update the text on the popup
 */
function updateStatus() {
  /**
   * Check if extension is allowed in incognito
   * If not allowed, display a message in the popup window
   */
  chrome.extension.isAllowedIncognitoAccess((allowed) => {
    if (!allowed) {
      clickableMessage.innerHTML = 'Learn how to also block cookie consent popups when browsing in incognito';
      clickableMessage.href = `https://www.davg25.com/?cookie-consent-popup-blocker-quickstart!?context=enable-incognito&version=${chrome.runtime.getManifest().version}&browser=${chrome.app ? 'chrome' : 'firefox'}`;
      clickableMessage.className = 'show';
    } else {
      clickableMessage.className = 'hide';
      clickableMessage.href = '';
      clickableMessage.innerHTML = '';
    }
  });

  /**
   * Check if extension is allowed in at least one Google
   * or YouTube domain and change the header and
   * messages in the popup window accordingly
   */
  chrome.permissions.getAll((permissions) => {
    const hasGoogleDomains = (permissions.origins.filter((origin) => origin.includes('google.'))).length > 0;
    const hasYouTubeDomains = (permissions.origins.filter((origin) => origin.includes('youtube.'))).length > 0;
    if ((hasGoogleDomains && !hasYouTubeDomains) || (!hasGoogleDomains && hasYouTubeDomains)) {
      header.innerHTML = 'Cookie consent popups are blocked only on allowed sites';
      header.className = 'success';
      warningMessage.className = 'hide';
      warningMessage.innerHTML = '';
    } else if (!hasGoogleDomains && !hasYouTubeDomains) {
      header.innerHTML = 'Cookie consent popups are not blocked';
      header.className = 'warning';
      clickableMessage.className = 'hide';
      clickableMessage.href = '';
      clickableMessage.innerHTML = '';
      warningMessage.innerHTML = 'Allow access to the desired sites in the extension\'s permissions to resume blocking';
      warningMessage.className = 'show';
    } else {
      header.innerHTML = 'Cookie consent popups are blocked on Google and YouTube';
      header.className = 'success';
      warningMessage.className = 'hide';
      warningMessage.innerHTML = '';
    }
  });
}

/**
 * Change the text on the popup when permissions are updated
 */
updateStatus();
chrome.permissions.onAdded.addListener(() => { updateStatus(); });
chrome.permissions.onRemoved.addListener(() => { updateStatus(); });
