/**
 * App config
 */
export default {
    // General
    VERSION: process.env.VERSION,
    BUILD: process.env.BUILD,
    PUBLIC_URL: process.env.PUBLIC_URL || '/',
    LOCALE: process.env.LOCALE || 'en',
    DEPLOYMENT_ENV: process.env.DEPLOYMENT_ENV,
    // Auth
    COOKIE_DOMAIN: process.env.COOKIE_DOMAIN || undefined,
    OIDC_SERVICE_URL: process.env.OIDC_SERVICE_URL,
    OIDC_REALM: process.env.OIDC_REALM,
    OIDC_CLIENT_ID: process.env.OIDC_CLIENT_ID,
    OAUTH2_SERVICE_URL: process.env.OAUTH2_SERVICE_URL,
    OAUTH2_CLIENT_ID: process.env.OAUTH2_CLIENT_ID,
    // Locale
    LOCALE_TRANSLATION_EN_US_URL: process.env.LOCALE_TRANSLATION_EN_US_URL,
};
