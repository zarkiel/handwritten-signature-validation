import { Component } from '@angular/core';
import { IconComponent } from "../../components/icon/icon.component";
import { select } from '@ngxs/store';
import { AppState } from '../../../state/app/state';
import { AuthService } from '../../../core/services/auth.service';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-user-dropdown',
    imports: [IconComponent, RouterModule],
    templateUrl: './user-dropdown.component.html',
    styleUrl: './user-dropdown.component.scss'
})
export class UserDropdownComponent {
    worker = select(AppState.worker);
    role = select(AppState.role);

    constructor(
        private authService: AuthService,
        
    ){

    }

    logout(){
        this.authService.logout()
    }
}
