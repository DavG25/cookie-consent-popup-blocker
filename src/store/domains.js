/**
 * Create array of URLs (that are either of Google or YouTube) from manifest host permissions
 */
export const manifestUrls = chrome.runtime.getManifest().permissions.filter((permission) => permission.includes('//'));

/**
 * Create array of dot domains from manifest URLs (like 'google.com', 'youtube.com')
 */
export const manifestDotDomains = manifestUrls.map((url) => url.substring(url.lastIndexOf('*.') + 1, url.lastIndexOf('/')));

/**
 * Create array of Google dot domains (like https://www.google.com/supported_domains)
 */
export const googleDotDomains = manifestDotDomains.filter((domain) => domain.includes('google.'));

/**
 * Create array of YouTube dot domains
 */
export const youtubeDotDomains = manifestDotDomains.filter((domain) => domain.includes('youtube.'));
