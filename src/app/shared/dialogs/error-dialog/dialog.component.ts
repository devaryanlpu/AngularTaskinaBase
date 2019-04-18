import { Component, ViewChild } from '@angular/core';

@Component({
    selector: 'taskina-error-dialog',
    styleUrls: ['styles.scss'],
    templateUrl: './dialog.component.html'
})

export class ErrorDialogComponent {
    dialogVisible: boolean;
    public projectName: string;
    public title: string;
    public message: string;
    constructor() {
    }
    showDialog() {
        this.dialogVisible = true;
    }

    hideDialog() {
        this.dialogVisible = false;
    }
}