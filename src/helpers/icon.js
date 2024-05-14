/**
 * Change extension icon according to current permissions
 */
export default function updateIcon() {
  chrome.permissions.getAll((permissions) => {
    // Check if extension is allowed in at least one Google or YouTube domain
    const hasGoogleDomains = (permissions.origins.filter((origin) => origin.includes('google.'))).length > 0;
    const hasYouTubeDomains = (permissions.origins.filter((origin) => origin.includes('youtube.'))).length > 0;
    if (!hasGoogleDomains && !hasYouTubeDomains) {
      chrome.browserAction.setIcon({ path: '/assets/icon128-off.png' });
    } else {
      chrome.browserAction.setIcon({ path: '/assets/icon128.png' });
    }
  });
}
