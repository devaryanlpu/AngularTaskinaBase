import { BrowserModule} from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './services/auth.service';
import { MyHttpInterceptor } from './guards/my-http-interceptor';
import { AuthTokenInterceptor } from './guards/auth-token.interceptor';
import { ServerOfflineInterceptor } from './guards/server-offline.interceptor';

// Imports of ngxbootstrap
import { ModalModule } from 'ngx-bootstrap';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { ErrorPageComponent } from './shared/components/error-page/error-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppConfigService } from './app-config.service';

const appInitializerFn = (appConfig: AppConfigService) => {
  return () => {
    return appConfig.loadAppConfig();
  };
};

const ServerOfflineInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ServerOfflineInterceptor,
  multi: true,
};

const AuthTokenInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthTokenInterceptor,
  multi: true,
};

const AppConfigServiceProvider = {
  provide: APP_INITIALIZER,
  useFactory: appInitializerFn,
  multi: true,
  deps: [AppConfigService]
};

@NgModule({
  declarations: [
    AppComponent,
    ErrorPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    BrowserAnimationsModule,
    ModalModule.forRoot()
  ],
  providers: [
    AuthService,
    AuthGuard,
    AppConfigService,
    AppConfigServiceProvider,
    ServerOfflineInterceptorProvider,
    AuthTokenInterceptorProvider


  ],
  bootstrap: [AppComponent],
  exports: [
  ]
})
export class AppModule { }





