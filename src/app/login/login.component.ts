import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from '../auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;

    constructor(private authService: AuthService) { }

    ngOnInit() {
        this.loginForm = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.minLength(5)]),
            password: new FormControl('', [Validators.required, Validators.minLength(8)])
        });
    }

    get email() { return this.loginForm.get('email'); }
    get password() { return this.loginForm.get('password'); }

    login() {
        const formValues = this.loginForm.value;
        this.authService.login(formValues.email, formValues.password);
    }
}
