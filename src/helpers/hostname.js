import { manifestDotDomains } from '../store/domains';

/**
 * Get hostname from URL
 */
export function getHostnameFromUrl(url) {
  const { hostname } = new URL(url);
  return hostname;
}

/**
 * Get root domain from hostname (for example 'www.google.com' returns 'google.com')
 *
 * Only works on hostnames that align with the extension manifest permissions,
 * otherwise returns null
 */
export function getManifestDotDomainFromHostname(hostname) {
  // Find the root domain by comparing it with our own list of root domains
  const dotDomain = manifestDotDomains.find((domain) => hostname.endsWith(domain));
  return dotDomain || null;
}
