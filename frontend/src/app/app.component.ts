import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, ToastModule, ConfirmDialogModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
    ngOnInit() {
        setTimeout(() => {
            const loaderContainer = document.getElementById('loader-container');
            if (loaderContainer) {
                loaderContainer.remove();
            }
        }, 0);
    }
}
