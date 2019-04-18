import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { BaseDialogComponent } from 'src/app/shared/dialogs/BaseDialogComponent';
import { ISubscription } from 'rxjs/Subscription';
import { SignupDialog } from './model';
import { SignupDialogService } from './signup-dialog.service';
import { LoginDialogService } from '../login/login-dialog.service';
import { HeaderComponent } from 'src/app/layouts/header/header.component';

@Component({
  selector: 'taskina-signup',
  templateUrl: './signup-dialog.component.html',
  styleUrls: ['./signup-dialog.component.scss']
})
export class SignupDialogComponent extends BaseDialogComponent<SignupDialog> implements OnDestroy {

  private dialogSub: ISubscription;
  private title: string;

  constructor(el: ElementRef, private dialogSvc: SignupDialogService,
              private loginDialogSvc: LoginDialogService,
              private header: HeaderComponent,) {
      super(SignupDialog, el, null);
      
      this.dialogSub = this.dialogSvc.showDialog$.subscribe(title => {
        this.title = title;
          this.showDialog();
      });
  }

  loginDialogLink()
  { 
    
    this.hideDialog();
    this.loginDialogSvc.showDialog('Log in to your account');
  }

  ngOnDestroy() {
      if (this.dialogSub) {
          this.dialogSub.unsubscribe();
      }
  }
}
