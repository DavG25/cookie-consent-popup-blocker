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
async function updateStatus() {
  /**
   * Check if extension is allowed in incognito
   * If not allowed, display a message in the popup window
   */
  await chrome.extension.isAllowedIncognitoAccess((allowed) => {
    if (!allowed) {
      clickableMessage.innerHTML = 'Learn how to also block cookie consent popups when browsing in incognito/private mode';
      const extensionId = encodeURIComponent(chrome.runtime.id);
      const extensionVersion = encodeURIComponent(chrome.runtime.getManifest().version);
      const browser = encodeURIComponent(chrome.app ? 'chrome' : 'firefox');
      clickableMessage.href = `https://www.davg25.com/?cookie-consent-popup-blocker-quickstart!?context=enable-incognito&id=${extensionId}&version=${extensionVersion}&browser=${browser}`;
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
  await chrome.permissions.getAll((permissions) => {
    // Get number of Google and YouTube sites present in the manifest
    const fullAccess = chrome.runtime.getManifest().permissions.filter((perm) => perm.includes('google.') || perm.includes('youtube.')).length;
    // Get number of Google and YouTube sites the extension has current access to
    const currentAccess = permissions?.origins?.filter((perm) => perm.includes('google.') || perm.includes('youtube.')).length;

    if (currentAccess === 0) {
      // Extension does not have access to any Google or YouTube site
      header.innerHTML = 'Google and YouTube cookie consent popups are not being blocked';
      header.className = 'warning';
      clickableMessage.className = 'hide';
      clickableMessage.href = '';
      clickableMessage.innerHTML = '';
      warningMessage.innerHTML = 'Allow access to the desired sites in the extension permissions to resume blocking';
      warningMessage.className = 'show';
    } else if (currentAccess < fullAccess) {
      // Extension has access to one or more (but not all) Google or YouTube sites
      header.innerHTML = 'Google and YouTube cookie consent popups are being partially blocked';
      header.className = 'success';
      clickableMessage.className = 'hide';
      clickableMessage.href = '';
      clickableMessage.innerHTML = '';
      warningMessage.innerHTML = 'Blocking is active only for the selected sites in the extension permissions';
      warningMessage.className = 'show';
    } else if (currentAccess === fullAccess) {
      // Extension has access to all Google and YouTube sites
      header.innerHTML = 'Google and YouTube cookie consent popups are being blocked';
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
