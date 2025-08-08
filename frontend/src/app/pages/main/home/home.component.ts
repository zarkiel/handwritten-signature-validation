import { Component, OnInit } from '@angular/core';
import { ProfileComponent } from "../../../common/layout/profile/profile.component";
import { MegaDropdownComponent } from "../../../common/layout/mega-dropdown/mega-dropdown.component";
import { NotificationDropdownComponent } from "../../../common/layout/notification-dropdown/notification-dropdown.component";
import { UserDropdownComponent } from "../../../common/layout/user-dropdown/user-dropdown.component";
import { MainnavComponent } from "../../../common/layout/mainnav/mainnav.component";
import { RouterModule } from '@angular/router';
declare var nifty: any;

@Component({
    selector: 'app-home',
    imports: [ProfileComponent, UserDropdownComponent, MainnavComponent, RouterModule],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
    ngOnInit() {
        //console.log(nifty)
        

        setTimeout(() => {
            const mainNavigation = new nifty.MainNavigation(document.querySelector('#mainnav-container'));            
            //const smoothDropdown = new nifty.SmoothDropdown()
            const navToggler = new nifty.SidebarToggler(document.querySelector('.nav-toggler'))
        }, 0)
        
        //const navToggler2 = new nifty.SidebarToggler(document.querySelector('.sidebar-toggler'))
    }
}
