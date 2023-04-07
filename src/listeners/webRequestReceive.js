import { getRootDomain, getHostnameFromUrl } from '../helpers/hostname';

export default function register(chrome, state) {
  /**
   * Update stored cookies when the request completes using the 'Set-Cookie' header
   */
  chrome.webRequest.onHeadersReceived.addListener(
    /**
     * Listener
     */
    (details) => {
      state.cookies.forEach((cookie) => {
        /**
         * Stop if the cookie domain does not match the current request domain
         */
        const currentDomain = getRootDomain(getHostnameFromUrl(details.url));
        const matchingDomainIndex = cookie.validDomains.findIndex(
          (domain) => domain.match(currentDomain),
        );
        const matchingDomain = cookie.validDomains[matchingDomainIndex];
        if (matchingDomainIndex === -1) return;

        /**
         * Stop if the cookie is valid and was already present in the client
         */
        if (state.requests[details.requestId].validClientCookies.includes(cookie.name)) return;

        /**
         * Create correct SameSite value for cookie header
         */
        const sameSiteValue = (() => {
          switch (cookie.sameSite) {
            case 'no_restriction':
              return '; SameSite=None';
            case 'lax':
              return '; SameSite=Lax';
            case 'strict':
              return '; SameSite=Strict';
            default:
              return '';
          }
        })();

        /**
         * Create new cookie
         */
        const newCookie = `${cookie.name}=${cookie.value};`
          + ` Domain=${matchingDomain};`
          + ` Expires=${cookie.expirationDate};`
          + ` Path=${cookie.path}`
          + `${cookie.httpOnly ? '; HttpOnly' : ''}`
          + `${sameSiteValue}`
          + `${cookie.secure ? '; Secure' : ''}`;

        /**
         * Create new header
         */
        const newHeader = {
          name: 'Set-Cookie',
          value: newCookie,
        };

        /**
         * Apply new header
         */
        details.responseHeaders.push(newHeader);
        // eslint-disable-next-line no-console
        if (process.env.DEVELOPMENT) console.log(`Creating header 'Set-Cookie' on domain '${matchingDomain}' with value '${newCookie}' for incoming request '${details.requestId}'`);
      });

      /**
       * Clear 'requests' data (used by to read previous data,
       * this should always be put on the last request lifecycle event)
       */
      delete state.requests[details.requestId];

      /**
       * Continue request
       */
      return { responseHeaders: details.responseHeaders };
    },
    /**
     * Filter
     */
    {
      urls: state.manifestUrls,
      types: ['main_frame'],
    },
    /**
     * Assign 'extraInfoSpec' based on current browser, as some require additional options
     */
    (() => {
      switch (state.browser) {
        case 'chrome':
          return ['blocking', 'responseHeaders', 'extraHeaders'];
        case 'firefox':
          return ['blocking', 'responseHeaders'];
        default:
          return ['blocking', 'responseHeaders'];
      }
    })(),
  );
}
