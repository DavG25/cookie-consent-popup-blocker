/**
 * Register listener to open quick start page on first install
 */
export default function register(state) {
  chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === 'install') {
      const extensionId = encodeURIComponent(chrome.runtime.id);
      const extensionVersion = encodeURIComponent(chrome.runtime.getManifest().version);
      const browser = encodeURIComponent(state.browser);
      const url = `https://www.davg25.com/?cookie-consent-popup-blocker-quickstart!?context=install&id=${extensionId}&version=${extensionVersion}&browser=${browser}`;
      chrome.tabs.create({ url });
    }
  });
}
