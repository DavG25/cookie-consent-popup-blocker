/**
 * Change extension icon according to current permissions
 */
export default function updateIcon() {
  chrome.permissions.getAll((permissions) => {
    // Get number of Google and YouTube sites the extension has current access to
    const currentAccess = permissions?.origins?.filter((perm) => perm.includes('google.') || perm.includes('youtube.')).length;

    // Check if extension is allowed in at least one Google or YouTube domain
    if (currentAccess === 0) {
      // Extension does not have access to any Google or YouTube sites
      chrome.browserAction.setIcon({ path: '/assets/icon128-off.png' });
    } else {
      // Extension has access to at least one or more Google or YouTube sites
      chrome.browserAction.setIcon({ path: '/assets/icon128.png' });
    }
  });
}
