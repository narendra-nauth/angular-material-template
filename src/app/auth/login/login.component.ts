import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import * as moment from 'moment';
import { EMPTY, of } from 'rxjs';
import 'rxjs/add/operator/delay';

import { AuthenticationService } from '../../core/services/auth.service';
import { NotificationService } from '../../core/services/notification.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
last_name
    loginForm: FormGroup;
    loading: boolean;

    constructor(private router: Router,
        private titleService: Title,
        private notificationService: NotificationService,
        private authenticationService: AuthenticationService) {
    }

    ngOnInit() {
        this.titleService.setTitle('Login - GWI Customer Portal');
        this.authenticationService.logout();
        this.createForm();
    }

    private createForm() {
        this.loginForm = new FormGroup({
            account_no: new FormControl('', [Validators.required, Validators.minLength(7), Validators.maxLength(7), Validators.pattern("^[0-9]*$")]),
            last_name: new FormControl('', Validators.required),
        });
    }

    login() {
        const account_no = this.loginForm.get('account_no').value;
        const last_name = this.loginForm.get('last_name').value;

        this.loading = true;
        this.authenticationService
            .login(account_no.toLowerCase(), last_name)
            .subscribe(
                data => {
                    if("custref" in data[0]){
                        localStorage.setItem('currentUser', JSON.stringify({
                            account_no: account_no,
                            last_name: last_name,
                            account_info: data,
                            expiration: moment().add(1, 'days').toDate(),
                        }));
                        this.router.navigate(['/']);
                    }
                    else{
                        this.notificationService.openSnackBar("Incorrect Account Number & Last Name Combination");
                        this.loading = false;
                    }
                },
                error => {
                    this.notificationService.openSnackBar(error.error);
                    this.loading = false;
                }
            );
    }
}
