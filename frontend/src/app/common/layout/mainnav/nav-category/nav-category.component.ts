import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-nav-category',
    imports: [],
    templateUrl: './nav-category.component.html',
    styleUrl: './nav-category.component.scss'
})
export class NavCategoryComponent {
    @Input({required: true}) title: string = "";
}
