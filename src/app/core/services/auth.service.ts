import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';
import * as moment from 'moment';
import 'rxjs/add/operator/delay';

import { environment } from '../../../environments/environment';
import { of, EMPTY } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    base_url  = "https://customers.gwiguyana.com/customer_details/";
    headers   =  new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": "Basic Y3VzdG9tZXJfYXBwOjdFOEVCMEQ1Q0I3QjREMzVENDYzRjA0RjFFQ0YzQUIz",
    });

    constructor(private http: HttpClient,
        @Inject('LOCALSTORAGE') private localStorage: Storage) {
    }

    login(account_no: string, last_name: string) {
        const url = this.base_url + account_no + '/' + last_name.toLowerCase();
        return this.http.get(`${url}`, {headers: this.headers});
    }

    logout(): void {
        this.localStorage.removeItem('currentUser');
    }

    getCurrentUser(): any {
        const currentUser = this.localStorage.getItem('currentUser');

        return {
            currentUser: currentUser,
            expiration: moment().add(1, 'days').toDate(),
        };
    }
}
