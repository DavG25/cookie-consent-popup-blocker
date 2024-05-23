/**
 * Convert 'Cookie' header to object containing cookies (name: value)
 */
export function cookieHeaderToCookieObject(cookies) {
  return cookies.split('; ').reduce((accumulator, cookie) => {
    const [name, ...valueParts] = cookie.split('=');
    // Join the value parts back to handle cases where '=' might be part of the value
    const value = valueParts.join('=');
    accumulator[name] = value;
    return accumulator;
  }, {});
}

/**
 * Convert object containing cookies (name: value) to 'Cookie' header
 */
export function cookieObjectToCookieHeader(object) {
  return Object.entries(object)
    .map(([key, value]) => `${key}=${value}`)
    .join('; ');
}

/**
 * Generate expiration date for cookies
 */
let compiledExpirationDate = new Date();
compiledExpirationDate.setTime(
  Math.trunc((compiledExpirationDate.getTime() + 5250000 * 60 * 1000)),
);
compiledExpirationDate = compiledExpirationDate.toGMTString();
export const expirationDate = compiledExpirationDate;
