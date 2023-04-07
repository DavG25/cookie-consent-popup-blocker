# Cookie Consent Popup Blocker

Cookie Consent Popup Blocker is a browser extension that blocks the “Before you continue” cookie consent popup on Google and YouTube sites, useful when frequently clearing cookies or starting new incognito sessions

This extension is compatible with Chrome, Chromium-based browsers, Firefox (including Firefox Android), and Gecko-based browsers

<br>

Blocking is possible by modifying the *CONSENT* and *SOCS* cookies on outgoing and incoming web requests

**Note**: to also block cookie consent popups in incognito, the extension must be manually allowed to run in incognito mode in the browser settings

<br>

# Install

The latest version of the extension can be installed from the [official site](https://www.davg25.com?cookie-consent-popup-blocker)

<br>

# Build

The extension was developed and compiled using Node.js version 18.15.0

## Setup
Install dependencies
```
npm install
```

## Debug
Build unpacked extension without minification for debug
```
npm run dev
```

## Lint
Lint and fix code
```
npm run lint
```
```
npm run fix
```

## Distribute
Minify and build for distribution
```
npm run build
```