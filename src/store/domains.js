/**
 * Import URLs from manifest.json
 */
export const manifestUrls = chrome.runtime.getManifest().permissions.filter((permission) => permission.includes('//'));

/**
 * Create array of domains from the manifest URLs
 */
const domains = manifestUrls.filter((url) => url.includes('//'));
domains.forEach((url, index) => {
  domains[index] = url.substring(url.lastIndexOf('*.') + 1, url.lastIndexOf('/'));
});
export const manifestDomains = domains;

/**
 * Create array of Google domains (can be found at https://www.google.com/supported_domains)
 */
export const googleDomains = manifestDomains.filter((domain) => domain.includes('google.'));

/**
 * Create array of YouTube domains
 */
export const youtubeDomains = manifestDomains.filter((domain) => domain.includes('youtube.'));
