import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpErrorResponse,
    HttpHandler
} from '@angular/common/http';

import { Observable, of } from 'rxjs';

// Example of user credentials to match against incoming credentials.
const username = 'me@domain.com';
const password = 'password';
const friends = ['alice', 'bob'];

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJtZUBkb2' +
    '1haW4uY29tIiwibmFtZSI6IkpvaG4gRG9lIn0.wKPiyFCFnCvNcK6vIqy2e_Cp9vXFwJxpx5HKVu_u3Wk';

const makeError = (status, error) => {
    return Observable.throw(
        new HttpErrorResponse({
            status,
            error
        })
    );
};
const makeResponse = body => {
    return of(
        new HttpResponse({
            status: 200,
            body
        })
    );
};

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const {
            body,       // object
            headers,    // object
            method,     // string
            url,        // string
        } = request;

        console.log('interceptor', method, url);

        if (url.endsWith('/auth')) {
            console.log(body);
            if (body.username === username && body.password === password) {
                return makeResponse(token);
            } else if (!body.username && !body.password) {
                return makeError(401, 'Invalid username or password');
            }
        } else if (url.endsWith('/friends')) {
            if (!headers.has('Authorization')) {
                return makeError(400, 'No authorization header');
            } else if (headers.get('Authorization') !== token) {
                return makeError(401, 'Unauthorized token');
            }
            return makeResponse(friends);
        }
        console.error('intercepted', method, url);
        return next.handle(request);

        // implement logic for handling API requests, as defined in the exercise instructions.
    }
}
