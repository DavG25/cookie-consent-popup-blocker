/**
 * Change extension badge title and icon according to current permissions
 */
export default function updateBadge() {
  chrome.permissions.getAll((permissions) => {
    // Get number of Google and YouTube sites the extension has current access to
    const currentAccess = permissions?.origins?.filter((perm) => perm.includes('google.') || perm.includes('youtube.')).length;

    // Get default extension badge title
    const defaultBadgeTitle = chrome.runtime.getManifest().browser_action.default_title;

    // Check if extension is allowed in at least one Google or YouTube domain
    if (currentAccess === 0) {
      // Extension does not have access to any Google or YouTube sites
      chrome.browserAction.setTitle({ title: `${defaultBadgeTitle} (disabled)` });
      chrome.browserAction.setIcon({ path: '/assets/icon128-off.png' });
    } else {
      // Extension has access to at least one or more Google or YouTube sites
      chrome.browserAction.setTitle({ title: `${defaultBadgeTitle} (enabled)` });
      chrome.browserAction.setIcon({ path: '/assets/icon128.png' });
    }
  });
}
