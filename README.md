# Google and YouTube Cookie Consent Popup Blocker

Google & YouTube Cookie Consent Popup Blocker is a browser extension that blocks the “Before you continue” cookie consent popup that appears on Google and YouTube, useful when frequently clearing cookies or starting new incognito/private sessions

![Google & YouTube Cookie Consent Popup Blocker](https://www.davg25.com/app/cookie-consent-popup-blocker/images/github/banner.png)

This extension is compatible with Chrome, Chromium-based browsers, Firefox (including Firefox Android), and Gecko-based browsers

<br>

Blocking is possible by modifying the *SOCS* cookie on outgoing and incoming web requests

**Note**: to also block cookie consent popups in incognito/private mode, the extension must be manually allowed to run in incognito/private mode in the browser extension settings

<br>

# Install

The latest version of the extension can be installed from the [official site](https://www.davg25.com?cookie-consent-popup-blocker!?ref=github-readme)

<br>

# Build

The extension was developed and compiled using Node.js version 20.9.0

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