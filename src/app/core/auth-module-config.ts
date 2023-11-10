import {OAuthModuleConfig} from 'angular-oauth2-oidc';

export const authModuleConfig: OAuthModuleConfig = {
   resourceServer: {
      allowedUrls: ['https://ncmsprogram.azurewebsites.net', 'logindev.compound-connect.com/connect','http://localhost:5001','https://identityserverasp.azurewebsites.net/connect'],
      sendAccessToken: true,
   }
};
