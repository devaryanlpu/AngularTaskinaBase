import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import { LoginDialogService } from '../Auth/login/login-dialog.service';
@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {
    constructor(private router: Router,
        private loginDialogSvc: LoginDialogService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const userToken = JSON.parse(localStorage.getItem('userToken'));
        let authReq = req.clone();

        if (userToken) {
            // Clone the request to add the new header.
            authReq = req.clone({ headers: req.headers.set("authorization", "bearer " + userToken.access_token) });

            console.log("Sending request with new header now ...");
        }

        //send the newly created request
        return next.handle(authReq)   
            .catch((error, caught) => {
                if (error.status === 401) {
                    localStorage.removeItem('userToken');
                    this.loginDialogSvc.showDialog('Log in to your account');
                }
                //return the error to the method that called it
                return Observable.throw(error);
            }) as any;
    }
}
