import { Component, Input } from '@angular/core';
import { IconComponent } from "../../../components/icon/icon.component";
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-nav-link',
    imports: [IconComponent, RouterModule],
    templateUrl: './nav-link.component.html',
    styleUrl: './nav-link.component.scss'
})
export class NavLinkComponent {
    @Input({ required: true }) link: string = "";
    @Input({ required: true }) label: string = "";
    @Input({ required: true }) icon: string = "";
}
