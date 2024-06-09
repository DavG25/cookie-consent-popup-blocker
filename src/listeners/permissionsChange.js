import updateBadge from '../helpers/badge';

/**
 * Register listener for permissions update event
 */
export default function register() {
  // Update badge when permissions update
  chrome.permissions.onAdded.addListener(() => { updateBadge(); });
  chrome.permissions.onRemoved.addListener(() => { updateBadge(); });
}
