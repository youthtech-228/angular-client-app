import {AuthConfig} from 'angular-oauth2-oidc';

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
   production: false,
   BASE_URL: 'http://localhost:5001/'
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

export const authConfig: AuthConfig = {
  loginUrl: 'https://identityserverasp.azurewebsites.net/connect/authorize',
  tokenEndpoint: 'https://identityserverasp.azurewebsites.net/connect/token',
  logoutUrl: 'https://identityserverasp.azurewebsites.net/connect/endsession',
   redirectUri: `${origin}`,
   clientId: 'ncms',
   scope: 'openid profile userapi offline_access',
   responseType: 'code',
   dummyClientSecret: 'ptc$123Secur1ty',
   requestAccessToken: true,
   clearHashAfterLogin: true,
   showDebugInformation: true,
   requireHttps: false,
   strictDiscoveryDocumentValidation: false,
   skipIssuerCheck: true,
   timeoutFactor: 0.25,
   useSilentRefresh: false,
};

