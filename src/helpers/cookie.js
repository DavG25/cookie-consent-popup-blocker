/**
 * Convert the 'Cookie' header to an object
 */
export function headerToObject(cookies) {
  return cookies.split('; ').reduce((prev, current) => {
    const [name, ...value] = current.split('=');
    prev[name] = value.join('=');
    return prev;
  }, {});
}

/**
 * Convert an object containing cookies (name: value) to a valid 'Cookie' header
 */
export function objectToHeader(object) {
  let header = '';
  Object.keys(object).forEach((key) => {
    if (header) header += '; ';
    header += `${key}=${object[key]}`;
  });
  return header;
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
