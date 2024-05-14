/**
 * Enable feedback page to be opened on uninstall
 */
export default function enable(state) {
  const extensionId = encodeURIComponent(chrome.runtime.id);
  const extensionVersion = encodeURIComponent(chrome.runtime.getManifest().version);
  const browser = encodeURIComponent(state.browser);
  const uninstallPageUrl = `https://www.davg25.com/?cookie-consent-popup-blocker-uninstall!?id=${extensionId}&version=${extensionVersion}&browser=${browser}`;
  chrome.runtime.setUninstallURL(uninstallPageUrl);
}
