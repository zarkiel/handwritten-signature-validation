import { Component } from '@angular/core';
import { select } from '@ngxs/store';
import { AppState } from '../../../state/app/state';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { IconComponent } from "../../components/icon/icon.component";

@Component({
    selector: 'app-profile',
    imports: [CommonModule, IconComponent],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.scss'
})
export class ProfileComponent {
    worker = select(AppState.worker);
    role = select(AppState.role);

    constructor(
        private authService: AuthService
    ) {

    }

    getName() {
        return `${this.worker()?.name.split(' ')[0]} ${this.worker()?.lastname1}`;
    }

    logout() {
        this.authService.logout()
    }
}
