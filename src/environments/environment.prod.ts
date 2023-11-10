import {AuthConfig} from 'angular-oauth2-oidc';

export const environment = {
   production: true,
   BASE_URL: 'https://ncmsprogram.azurewebsites.net/'
};

export const authConfig: AuthConfig = {
  loginUrl: 'https://login.compound-connect.com/connect/authorize',
  tokenEndpoint: 'https://login.compound-connect.com/connect/token',
   logoutUrl: 'https://logindev.compound-connect.com/connect/endsession',
  redirectUri: `${origin}`,
  clientId: 'ncms',
  scope: 'openid profile userapi offline_access',
  responseType: 'code',
  dummyClientSecret: 'ptc$123Secur1ty',
  requestAccessToken: true,
  clearHashAfterLogin: true,
  showDebugInformation: false,
  requireHttps: false,
  strictDiscoveryDocumentValidation: false,
  skipIssuerCheck: true,
  timeoutFactor: 0.25,
  useSilentRefresh: false,
};
