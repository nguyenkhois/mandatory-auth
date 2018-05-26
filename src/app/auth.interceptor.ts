import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs';

// Example of user credentials to match against incoming credentials.
const username  = 'me@domain.com';
const password  = 'password';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>): Observable<HttpEvent<any>> {
    const {
        body,       // object
        headers,    // object
        method,     // string
        url,        // string
    } = req;

    return;

    // implement logic for handling API requests, as defined in the exercise instructions.
  }
}
