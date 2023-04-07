/**
 * Register listener to open quick start page on first install
 */
export default function register(state) {
  chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === 'install') {
      const url = `https://www.davg25.com/?cookie-consent-popup-blocker-quickstart!?context=install&version=${chrome.runtime.getManifest().version}&browser=${state.browser}`;
      chrome.tabs.create({ url });
    }
  });
}
