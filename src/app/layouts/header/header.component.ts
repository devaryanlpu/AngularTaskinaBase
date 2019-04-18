import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {Router} from '@angular/router';
import { LoginDialogService } from '../../Auth/login/login-dialog.service';
import { SignupDialogService } from '../../Auth/signup/signup-dialog.service';
@Component({
  selector: 'taskina-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public authServc: AuthService,
              private route: Router, 
              private loginDialogSvc: LoginDialogService,
              private signupDialogSvc: SignupDialogService) { }
  logout() {
    this.authServc.logout();
    this.route.navigate(['/']);
  }
  ngOnInit() {
  }
  
  loginDialog()
  { 
      this.loginDialogSvc.showDialog('Log in to your account');
  }

  signupDialog()
  {
    this.signupDialogSvc.showDialog('Join Us');
  }
}
