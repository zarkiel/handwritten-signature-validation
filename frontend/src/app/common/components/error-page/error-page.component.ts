import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-error-page',
    imports: [RouterModule],
    templateUrl: './error-page.component.html',
    styleUrl: './error-page.component.scss'
})
export class ErrorPageComponent {
    @Input({ required: true }) code: string = "";
    @Input({ required: true }) summary: string = "";
    @Input({ required: true }) details: string = "";
}
