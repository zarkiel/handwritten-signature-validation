import { Component } from '@angular/core';
import { select } from '@ngxs/store';
import { AppState } from '../../../state/app/state';
import { IconComponent } from "../../components/icon/icon.component";
import { NavLinkComponent } from "./nav-link/nav-link.component";
import { NavCategoryComponent } from "./nav-category/nav-category.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-mainnav',
  imports: [NavLinkComponent, NavCategoryComponent, RouterModule],
  templateUrl: './mainnav.component.html',
  styleUrl: './mainnav.component.scss'
})
export class MainnavComponent {

    pages = select(AppState.pages)


    getPageByName(name: string) {
        return this.pages().find(page => page.name === name);
    }

}
