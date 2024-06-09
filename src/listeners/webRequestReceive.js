import { Cookie } from '../helpers/cookie';
import { getManifestDotDomainFromHostname, getHostnameFromUrl } from '../helpers/hostname';
import { manifestUrls } from '../store/domains';

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
        const currentHostname = getHostnameFromUrl(details.url);
        const currentDotDomain = getManifestDotDomainFromHostname(currentHostname);
        const matchingDomain = cookie.validDomains.find(
          (domain) => domain === currentDotDomain,
        );
        if (matchingDomain === undefined) return;

        /**
         * Stop if the cookie is valid and was already present in the client
         */
        if (state.requests[details.requestId].validClientCookies.includes(cookie.name)) return;

        /**
         * Create new cookie
         */
        const newCookie = new Cookie({
          name: cookie.name,
          value: cookie.value,
          path: cookie.path,
          domain: matchingDomain,
          maxAge: cookie.maxAge,
          secure: cookie.secure,
          httpOnly: cookie.httpOnly,
          sameSite: cookie.sameSite,
        });

        /**
         * Create new header
         */
        const newHeader = {
          name: 'Set-Cookie',
          value: newCookie.toString(),
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
      urls: manifestUrls,
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
