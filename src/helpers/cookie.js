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
 * Generate max age (expiration date in seconds) for cookie
 */
export function generateCookieMaxAge(maxAgeInDays) {
  return maxAgeInDays * 24 * 60 * 60;
}

/**
 * Create a cookie that can be used in the 'Set-Cookie' header when invoked with .toString()
 */
export class Cookie {
  constructor({
    name, value, path, domain, maxAge, expires, secure, httpOnly, sameSite,
  }) {
    if (!name || !value) {
      throw new Error('Cookie name and value are required');
    }

    this.name = name;
    this.value = value;
    this.path = path;
    this.domain = domain;
    this.maxAge = maxAge;
    this.expires = expires;
    this.secure = secure;
    this.httpOnly = httpOnly;
    this.sameSite = sameSite;
  }

  toString() {
    let cookieString = `${encodeURIComponent(this.name)}=${encodeURIComponent(this.value)}`;

    if (this.path) {
      cookieString += `; Path=${this.path}`;
    }

    if (this.domain) {
      cookieString += `; Domain=${this.domain}`;
    }

    if (this.maxAge !== undefined) {
      cookieString += `; Max-Age=${this.maxAge}`;
    }

    if (this.secure) {
      cookieString += '; Secure';
    }

    if (this.httpOnly) {
      cookieString += '; HttpOnly';
    }

    if (this.sameSite) {
      cookieString += `; SameSite=${this.sameSite}`;
    }

    return cookieString;
  }
}
