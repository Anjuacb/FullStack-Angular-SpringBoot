import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { lastValueFrom, Observable, from } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private auth: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('🔍 Interceptor running for:', request.url);
    return from(this.handleAccess(request, next));
  }

  private async handleAccess(request: HttpRequest<any>, next: HttpHandler): Promise<HttpEvent<any>> {
    try {
      // only secure endpoints
      if (request.url.includes('/api/orders')) {
        console.log('Intercepting request:', request.url);

        // get access token
        const token = await lastValueFrom(this.auth.getAccessTokenSilently());
        console.log('Access Token:', token);

        if (token) {
          // clone request and add Authorization header
          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`,
            },
          });
        }
      }

      // proceed with (possibly modified) request
      return await lastValueFrom(next.handle(request));
    } catch (err) {
      console.error('Error in AuthInterceptor:', err);
      return await lastValueFrom(next.handle(request));
    }
  }
}
