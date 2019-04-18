import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class LoginDialogService {
    private showDialogSource = new Subject<string>();
    public showDialog$ = this.showDialogSource.asObservable();
    
    showDialog(title: string) {
        console.log("ok")
        this.showDialogSource.next(title);
    }

}
