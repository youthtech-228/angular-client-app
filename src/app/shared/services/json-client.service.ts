import {Inject, Injectable} from '@angular/core';
import {OAuthStorage} from 'angular-oauth2-oidc';
import {JsonServiceClient} from '@servicestack/client';

@Injectable({
  providedIn: 'root'
})
export class JsonClientService {
   client: JsonServiceClient;

   constructor(@Inject('BASE_URL') private baseUrl: string, private authStorage: OAuthStorage) {

      this.client = new JsonServiceClient(this.baseUrl);
      this.client.bearerToken = this.authStorage.getItem('access_token');
   }

   getClient() {
      return this.client;
   }
}
