import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { ISubscription } from 'rxjs/Subscription';
import { BaseDialogComponent } from '../../shared/dialogs/BaseDialogComponent';
import { LoginDialog } from './model';
import { LoginDialogService } from './login-dialog.service';
import { SignupDialogService } from '../signup/signup-dialog.service';

import { AuthService, AuthResult } from '../../services/auth.service';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router'
import 'rxjs/add/operator/first';
@Component({
  selector: 'taskina-login',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent extends BaseDialogComponent<LoginDialog> implements OnDestroy {

  private dialogSub: ISubscription;
  private title: string;
  credentials: LoginDialog = new LoginDialog();
  error: string;
  success: string;
  submitted: boolean;
  constructor(el: ElementRef, 
              private dialogSvc: LoginDialogService,
              private signupdialogSvc: SignupDialogService,
              private authService: AuthService,
              private router: Router) {
  
      super(LoginDialog, el, null);
      
      this.dialogSub = this.dialogSvc.showDialog$.subscribe(title => {
        this.title = title;
          this.showDialog();
      });
  }
  
  signupDialogLink()
  {
    this.hideDialog();
    this.signupdialogSvc.showDialog('Join Us');
  } 

  login(valid: boolean) {
    debugger
    if (!valid) return;

    this.error = "";
    this.success = "";
    this.submitted = true;

    this.authService
      .login(this.credentials.email, this.credentials.password)
      .first()
      .subscribe(r => this.onLogin(r));
  }

  private onLogin(result: AuthResult): void {
    this.submitted = false;
    
    if (result == AuthResult.Success) {
      this.error = null;
      
      (<any>window).Intercom("boot", {
          app_id: environment.intercomKey,
          email: this.credentials.email
      });

      this.router.navigateByUrl('/home');
    }
    else if (result == AuthResult.ServerOffline) {
      this.error = "The server is offline. Please try again later.";
    }
    else if (result == AuthResult.InvalidCredentials) {
      this.error = "The username or password is incorrect.";
    }
  
  }

  ngOnDestroy() {
      if (this.dialogSub) {
          this.dialogSub.unsubscribe();
      }
  }

}
