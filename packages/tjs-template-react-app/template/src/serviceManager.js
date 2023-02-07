import {ServiceManager} from '@computerrock/formation-core';
import {I18nService} from '@computerrock/formation-i18n';
import {OpenIDConnectClient} from '@computerrock/oidc-auth-client';
import {OAuth2Client} from '@computerrock/oauth2-auth-client';
// import {DatadogLoggerClient} from '@computerrock/datadog-logger-client';
import config from './config';
import defaultLocaleTranslations from './locale';

// register application services
const serviceManager = new ServiceManager();

// initialize Datadog logger
// if (config.DATADOG_ENABLE) {
//     const ffwLoggerService = serviceManager.loadService('ffwLoggerService');
//     ffwLoggerService.setLoggerClient(new DatadogLoggerClient({
//         applicationId: config.DATADOG_RUM_APPLICATION_ID,
//         clientToken: config.DATADOG_CLIENT_TOKEN,
//         service: config.DATADOG_SERVICE,
//         options: {
//             env: config.DEPLOYMENT_ENV,
//             version: `v${config.APP_VERSION}`,
//         },
//     }));
// }

serviceManager.registerService('i18nService', I18nService({
    LOCALE: 'en-US',
    DEFAULT_LOCALE_TRANSLATIONS: defaultLocaleTranslations,
    LOCALE_RESOURCES: [
        {
            'locale': 'en-US',
            'url': config.LOCALE_TRANSLATION_EN_US_URL,
        },
    ],
}));

serviceManager.registerService('authOIDCService', new OpenIDConnectClient({
    authServiceId: 'oidc',
    serviceURL: config.OIDC_SERVICE_URL,
    realm: config.OIDC_REALM,
    clientId: config.OIDC_CLIENT_ID,
    cookieDomain: config.COOKIE_DOMAIN,
}));

serviceManager.registerService('authOAuth2Service', new OAuth2Client({
    authServiceId: 'oauth2',
    serviceURL: config.OAUTH2_SERVICE_URL,
    clientId: config.OAUTH2_CLIENT_ID,
    cookieDomain: config.COOKIE_DOMAIN,
}));

export default serviceManager;
