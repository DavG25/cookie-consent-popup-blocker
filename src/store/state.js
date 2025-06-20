import { googleDotDomains, youtubeDotDomains } from './domains';
import { generateCookieMaxAge } from '../helpers/cookie';

/**
 * Build state
 */
export default {
  browser: chrome.app ? 'chrome' : 'firefox',
  cookies: [
    {
      validDomains: googleDotDomains, // Array of domains compatible with this cookie
      validRegex: /^C.*/, // Regex to check against to consider the cookie valid
      name: 'SOCS',
      value: 'CAESHAgBEhJnd3NfMjAyNTA1MjctMF9SQzEaAmVuIAEaBgiA6uPBBg', // Equals to 'Reject all'
      maxAge: generateCookieMaxAge(395),
      httpOnly: false,
      path: '/',
      sameSite: 'Lax',
      secure: true,
    },
    {
      validDomains: youtubeDotDomains, // Array of domains compatible with this cookie
      validRegex: /^C.*/, // Regex to check against to consider the cookie valid
      name: 'SOCS',
      value: 'CAESNQgDEitib3FfaWRlbnRpdHlmcm9udGVuZHVpc2VydmVyXzIwMjUwNTI3LjA3X3AwGgJlbiACGgYIgOrjwQY', // Equals to 'Reject all'
      maxAge: generateCookieMaxAge(395),
      httpOnly: false,
      path: '/',
      sameSite: 'Lax',
      secure: true,
    },
  ],
  // First session network delay in milliseconds, see explanation below for this setting
  networkDelay: 0,
  // Object with each request's data (request ID as key), used to share values between requests
  requests: {},
};

/**
 * What is the 'networkDelay' setting?
 *
 * When opening a new incognito window some ad blockers need some time to
 * initialize in order to start blocking ads
 *
 * Without this extension the user would not notice the adblock
 * initialization time since the cookie consent popup will appear
 *
 * Let's take YouTube for example, when opening an incognito window
 * without this extension the cookie consent popup will appear,
 * during this time the adblock has time to initialize, and once
 * the popup is closed the adblock is ready to block the YouTube ads
 *
 * When this extension is enabled and a new incognito window is opened,
 * the YouTube cookie consent popup will not appear and the video (and ads)
 * will start instantly, giving no time to the adblock to initialize and start blocking ads
 *
 * This is fixed by delaying the request by an amount of time
 * (set in the 'networkDelay' variable as milliseconds) that is
 * considered enough for most ad blockers to initialize (usually 500 milliseconds)
 *
 * Newer versions of ad blockers should not have this issue and
 * it's therefore safe to leave 'networkDelay' set to 0 (disabled)
 */
