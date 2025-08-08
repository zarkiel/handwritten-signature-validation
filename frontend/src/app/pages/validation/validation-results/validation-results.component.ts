import { Component, signal } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
    selector: 'app-validation-results',
    imports: [],
    templateUrl: './validation-results.component.html',
    styleUrl: './validation-results.component.scss'
})
export class ValidationResultsComponent {
    results = signal<any>(null);
    constructor(
        private dialogConfig: DynamicDialogConfig
    ){
        this.results.set(this.dialogConfig.data.results);
    }


}
