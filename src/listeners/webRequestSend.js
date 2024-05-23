import { getManifestDotDomainFromHostname, getHostnameFromUrl } from '../helpers/hostname';
import { cookieHeaderToCookieObject, cookieObjectToCookieHeader } from '../helpers/cookie';
import { manifestUrls } from '../store/domains';

export default function register(chrome, state) {
  /**
   * Override cookies before the request is sent using the 'Cookie' header
   */
  chrome.webRequest.onBeforeSendHeaders.addListener(
    /**
     * Listener
     */
    (details) => {
      const validClientCookies = [];
      state.cookies.forEach((cookie) => {
        /**
         * Stop if the cookie domain does not match the current request domain
         */
        const currentHostname = getHostnameFromUrl(details.url);
        const currentDotDomain = getManifestDotDomainFromHostname(currentHostname);
        const matchingDomain = cookie.validDomains.find(
          (domain) => domain === currentDotDomain,
        );
        if (matchingDomain === undefined) return;

        /**
         * Find the 'Cookie' header index
         */
        const cookieHeaderIndex = details.requestHeaders.findIndex((header) => header.name === 'Cookie');
        if (cookieHeaderIndex === -1) {
          /**
           * Header 'Cookie' is not present, create it
           */
          details.requestHeaders.push({
            name: 'Cookie',
            value: `${cookie.name}=${cookie.value};`,
          });
          // eslint-disable-next-line no-console
          if (process.env.DEVELOPMENT) console.log(`Creating header 'Cookie' on domain '${matchingDomain}' with value '${cookie.value}' for outgoing request '${details.requestId}'`);

          /**
           * Give time to the adblock to initialize on first session start
           * This is considered a first time session because the 'Cookie' header is not present
           * See explanation in the file '../store/state.js'
           */
          if (state.networkDelay > 0) {
            // eslint-disable-next-line no-console
            if (process.env.DEVELOPMENT) console.log(`Delaying outgoing request '${details.requestId}' by '${state.networkDelay}' milliseconds on domain '${matchingDomain}'`);
            const now = new Date().getTime();
            // eslint-disable-next-line no-empty
            while (new Date().getTime() < now + state.networkDelay) {}
          }
        } else {
          /**
           * Header 'Cookie' is present, convert it to an object
           */
          const cookieHeaderValue = details.requestHeaders[cookieHeaderIndex].value;
          const cookiesOject = cookieHeaderToCookieObject(cookieHeaderValue);

          /**
           * Check if cookies object contains our cookie
           */
          if (Object.prototype.hasOwnProperty.call(cookiesOject, cookie.name)) {
            /**
             * Cookie is present, replace its value if it's invalid
             */
            if (!cookie.validRegex.test(cookiesOject[cookie.name])) {
              /**
               * Cookie is present but has an invalid value, replace it
               */
              cookiesOject[cookie.name] = cookie.value;
              // eslint-disable-next-line no-console
              if (process.env.DEVELOPMENT) console.log(`Replacing cookie '${cookie.name}' on domain '${matchingDomain}' with new value '${cookie.value}' for outgoing request '${details.requestId}'`);
            } else {
              /**
               * Cookie is present and has a valid value,
               * add to list of currently present cookies in the client browser
               */
              validClientCookies.push(cookie.name);
              // eslint-disable-next-line no-console
              if (process.env.DEVELOPMENT) console.log(`Cookie '${cookie.name}' already present on domain '${matchingDomain}' with valid value '${cookie.value}' for outgoing request '${details.requestId}'`);
            }
          } else {
            /**
             * Cookie is not present, add it
             */
            cookiesOject[cookie.name] = cookie.value;
            // eslint-disable-next-line no-console
            if (process.env.DEVELOPMENT) console.log(`Creating cookie '${cookie.name}' on domain '${matchingDomain}' with value '${cookie.value}' for outgoing request '${details.requestId}'`);
          }

          /**
           * Convert the cookies object back to a valid 'Cookie' header
           */
          const cookieHeader = cookieObjectToCookieHeader(cookiesOject);
          details.requestHeaders[cookieHeaderIndex].value = cookieHeader;
        }
      });

      /**
       * Add request data to 'requests' (used by other requests to read previous data)
       */
      state.requests[details.requestId] = {};
      state.requests[details.requestId].validClientCookies = validClientCookies;

      /**
       * Continue request
       */
      return { requestHeaders: details.requestHeaders };
    },
    /**
     * Filter
     */
    {
      urls: manifestUrls,
      types: ['main_frame'],
    },
    /**
     * Assign 'extraInfoSpec' based on current browser, as some require additional options
     */
    (() => {
      switch (state.browser) {
        case 'chrome':
          return ['blocking', 'requestHeaders', 'extraHeaders'];
        case 'firefox':
          return ['blocking', 'requestHeaders'];
        default:
          return ['blocking', 'requestHeaders'];
      }
    })(),
  );
}
