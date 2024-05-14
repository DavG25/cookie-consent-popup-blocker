import updateIcon from '../helpers/icon';

/**
 * Register listener for permissions update event
 */
export default function register() {
  // Update icon when permissions update
  chrome.permissions.onAdded.addListener(() => { updateIcon(); });
  chrome.permissions.onRemoved.addListener(() => { updateIcon(); });
}
