import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthHttpInterceptor, AuthModule } from '@auth0/auth0-angular';
import myAppConfig from './config/my-app-config';
import { AuthInterceptorService } from './services/auth-interceptor.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),  // this replaces HttpClientModule
    importProvidersFrom(NgbModule),
    importProvidersFrom(ReactiveFormsModule),


    // ✅ Auth0 setup
    importProvidersFrom(
      AuthModule.forRoot({
        ...myAppConfig.auth,
        httpInterceptor:{
          ...myAppConfig.httpInterceptor,
        },
      })
    ),

     // ✅ Interceptor for adding tokens
     {
      provide:HTTP_INTERCEPTORS,
      useClass:AuthInterceptorService,
      multi:true,
     },
  ],
};




