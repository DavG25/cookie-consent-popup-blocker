/**
 * Import current state and modules
 */
import state from './store/state';
import updateBadge from './helpers/badge';
import registerBeforeSendHeadersListener from './listeners/webRequestSend';
import registerHeadersReceivedListener from './listeners/webRequestReceive';
import registerPermissionsListener from './listeners/permissionsChange';
import registerInstallListener from './listeners/runtimeInstall';
import enableUninstallPage from './helpers/uninstallPage';

/**
 * Set extension badge title and icon
 */
updateBadge();

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
