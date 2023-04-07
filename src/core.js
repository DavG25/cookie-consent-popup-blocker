/**
 * Import current state and modules
 */
import state from './store/state';
import registerBeforeSendHeadersListener from './listeners/webRequestSend';
import registerHeadersReceivedListener from './listeners/webRequestReceive';
import registerPermissionsListener from './listeners/permissionsChange';
import registerInstallListener from './listeners/runtimeInstall';

/**
 * Register listeners
 */
registerBeforeSendHeadersListener(chrome, state);
registerHeadersReceivedListener(chrome, state);
registerPermissionsListener();
registerInstallListener(state);
