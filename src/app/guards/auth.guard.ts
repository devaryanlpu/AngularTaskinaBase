import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LoginDialogService } from '../Auth/login/login-dialog.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor (
        private authSvc: AuthService,
        private router: Router,
        private loginDialogSvc: LoginDialogService
    ) { }
 
    canActivate() {
        if (this.authSvc.isLoggedIn) {
            return true;
        }
 console.log("Not")
        this.loginDialogSvc.showDialog('Log in to your account');
        return false;
    }
}
