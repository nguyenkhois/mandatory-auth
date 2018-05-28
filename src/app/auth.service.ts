import { Injectable } from '@angular/core';
import {
    HttpClient,
    HttpResponse,
    HttpErrorResponse,
    HttpHeaders
} from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import * as jwtDecode from 'jwt-decode';

import { User } from './constants';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    _user: User;

    constructor(private http: HttpClient) { }

    // Create properties
    get user() {
        return this._user;
    }

    get authenticated() {
        return this._user !== undefined && this._user !== null;
    }

    handleError(error: HttpErrorResponse) {
        return Observable.throw({
            error: error.error
        });
    }

    login(credentials): Observable<User> {
        const makePost = this.http.post<User>('api/auth', credentials);
        makePost.subscribe(
            (results: any) => {
                this._user = jwtDecode(results);
                localStorage.setItem('access_token', results.toString());
            },
            (error) => {
                console.log('Login error', error);
            }
        );

        return makePost;
    }

    logout() {
        this._user = null;
        localStorage.removeItem('access_token');
    }

    getResource(resource): Observable<any> {
        const access_token = localStorage.getItem('access_token');
        let httpOptions;
        if (access_token !== null) {
            httpOptions = {
                headers: new HttpHeaders({
                    'Authorization': access_token
                })
            };
        } else {
            httpOptions = {};
        }
        return this.http.get<string[]>('/api/' + resource, httpOptions);

    }
}
