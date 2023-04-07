/**
 * Check if extension is allowed in at least one Google
 * or YouTube domain and change the icon accordingly
 */
function updateIcon() {
  chrome.permissions.getAll((permissions) => {
    const hasGoogleDomains = (permissions.origins.filter((origin) => origin.includes('google.'))).length > 0;
    const hasYouTubeDomains = (permissions.origins.filter((origin) => origin.includes('youtube.'))).length > 0;
    if (!hasGoogleDomains && !hasYouTubeDomains) {
      chrome.browserAction.setIcon({ path: '/assets/icon128-off.png' });
    } else {
      chrome.browserAction.setIcon({ path: '/assets/icon128.png' });
    }
  });
}

/**
 * Set the extension's icon and register listeners to
 * change it when permissions are updated
 */
export default function register() {
  updateIcon();
  chrome.permissions.onAdded.addListener(() => { updateIcon(); });
  chrome.permissions.onRemoved.addListener(() => { updateIcon(); });
}
