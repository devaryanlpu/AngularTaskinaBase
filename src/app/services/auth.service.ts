import { Injectable } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { HttpClient, HttpParams, HttpHeaders, HttpRequest } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';
import 'rxjs/add/observable/of';

export enum AuthResult {
  Success = 0,
  InvalidCredentials = 1,
  ServerOffline = 2,
}

interface ILoginResponse {
  access_token: string,
  token_type: string,
  expires_in: number,
  userName: string,
  fullName: string,
  profileSysId: string,
  refresh_token: string,
  thumbnailImageName: string,
  ".issued": string,
  ".expires": string
}

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) {

  }
  cachedRequests: Array<HttpRequest<any>> = [];
  authTokenStale: string = 'stale_auth_token';
  authTokenNew: string = 'new_auth_token';
  currentToken: string;
    get userName() {
      return localStorage.getItem(environment.storage.auth.userName);
  }
    get isLoggedIn() {
      return this.accessToken !== null;
  }
  get isLoggedInWithTaskina() {
    return localStorage.getItem(environment.storage.auth.loginWithTaskina);
  }

  set isOnTaskinaSite(v: string) {
    localStorage.setItem(environment.storage.auth.isOnTaskinaSite, v);
  }

  get isOnTaskinaSite() {
    return localStorage.getItem(environment.storage.auth.isOnTaskinaSite);

  }

  get bearer() {
      if (!this.isLoggedIn) {
          return null;
      }

      return `Bearer ${this.accessToken}`;
  }

  private get accessToken() {
      return localStorage.getItem(environment.storage.auth.accessToken);
  }

  private get refreshToken() {
      return localStorage.getItem(environment.storage.auth.refreshtoken);
  }

  collectFailedRequest(request): void {
      this.cachedRequests.push(request);
  }

  retryFailedRequests(): void {
      // retry the requests. this method can
      // be called after the token is refreshed
  }

login(username: string, password: string): Observable<AuthResult> {
    const params = new HttpParams()
        .set("username", username)
        .set("password", password)
        .set("grant_type", "password");

    const headers = new HttpHeaders()
        .set("Content-Type", "application/x-www-form-urlencoded");

    return this.http
        .post<ILoginResponse>(environment.endpoints.auth.url, params, { headers })
        .pipe(map(r => this.onLogin(r)))
        .catch(e => this.onError(e));       
}

getAccessToken() {
    const params = new HttpParams().set("refresh_token", this.refreshToken).set("grant_type", "refresh_token");

    const headers = new HttpHeaders()
        .set("Content-Type", "application/x-www-form-urlencoded");

    return this.http.post<ILoginResponse>(environment.endpoints.auth.url, params, { headers })
    .pipe(map(r => this.onRefreshTokenSuccess(r)))
        .catch((error: any) => {
            return Observable.throw(error.statusText);
        });
}
private onLogin(response: ILoginResponse): AuthResult {
  if (response.access_token) {
      localStorage.setItem(environment.storage.auth.accessToken, response.access_token);
      localStorage.setItem(environment.storage.auth.profileId, response.profileSysId);
      localStorage.setItem(environment.storage.auth.refreshtoken, response.refresh_token);
      localStorage.setItem(environment.storage.auth.thumbnailImageName, response.thumbnailImageName);
      localStorage.setItem(environment.storage.auth.userName, response.userName);
      localStorage.setItem(environment.storage.auth.fullName, response.fullName);
      if (this.isLoggedInWithTaskina == 'initiate') {
          localStorage.setItem(environment.storage.auth.loginWithTaskina, 'complete');
      }

      return AuthResult.Success;
  } else {
      return AuthResult.InvalidCredentials;
  }
}
logout(): void {
    localStorage.removeItem(environment.storage.auth.accessToken);
    localStorage.removeItem(environment.storage.auth.profileId);
    localStorage.removeItem(environment.storage.auth.thumbnailImageName);
    localStorage.removeItem(environment.storage.auth.loginWithTaskina);
    localStorage.removeItem(environment.storage.auth.refreshtoken);
    localStorage.removeItem(environment.storage.auth.userName);
    localStorage.removeItem(environment.storage.auth.fullName);
}


forgotPassword(email: string) {
   
}

resetPassword(model: any) {
 
}
private onRefreshTokenSuccess(response: ILoginResponse): AuthResult {
  if (response.access_token) {
      localStorage.setItem(environment.storage.auth.accessToken, response.access_token);
      localStorage.setItem(environment.storage.auth.profileId, response.profileSysId);
      localStorage.setItem(environment.storage.auth.refreshtoken, response.refresh_token);
      localStorage.setItem(environment.storage.auth.thumbnailImageName, response.thumbnailImageName);
      localStorage.setItem(environment.storage.auth.userName, response.userName);
      localStorage.setItem(environment.storage.auth.fullName, response.fullName);
      return AuthResult.Success;
  } else {
      return AuthResult.ServerOffline;
  }
}

private onError(error): Observable<any> {
  if (error.status == 400) {
      let error_msg: string = error.error.error_description;
      if (AuthResult[error_msg] == AuthResult.InvalidCredentials) {
          return Observable.of(AuthResult.InvalidCredentials);
      }
    
  }
  return Observable.of(AuthResult.ServerOffline)
}
}
