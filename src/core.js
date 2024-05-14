/**
 * Import current state and modules
 */
import state from './store/state';
import updateIcon from './helpers/icon';
import registerBeforeSendHeadersListener from './listeners/webRequestSend';
import registerHeadersReceivedListener from './listeners/webRequestReceive';
import registerPermissionsListener from './listeners/permissionsChange';
import registerInstallListener from './listeners/runtimeInstall';
import enableUninstallPage from './helpers/uninstallPage';

/**
 * Set current extension icon
 */
updateIcon();

/**
 * Register event listeners
 */
registerBeforeSendHeadersListener(chrome, state);
registerHeadersReceivedListener(chrome, state);
registerPermissionsListener();
registerInstallListener(state);

/**
 * Enable uninstall feedback page
 */
enableUninstallPage(state);
