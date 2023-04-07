/**
 * Get hostname from URL
 */
export function getHostnameFromUrl(url) {
  const { hostname } = new URL(url);
  return hostname;
}

/**
 * Get root domain from URL
 */
export function getRootDomain(url) {
  const urlParts = new URL(
    url.startsWith('http') === false ? `http://${url}` : url,
  ).hostname.split('.');
  return urlParts.slice(0).slice(-(urlParts.length === 4 ? 3 : 2)).join('.');
}
