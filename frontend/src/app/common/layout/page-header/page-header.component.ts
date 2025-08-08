import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-page-header',
    imports: [CommonModule],
    templateUrl: './page-header.component.html',
    styleUrl: './page-header.component.scss'
})
export class PageHeaderComponent {
    @Input({ required: true }) title: string = "";
    @Input({ required: true }) subtitle: string = "";

    @Input({ required: true }) breadcrumbs: string = ""

    getBreadcrumbs() {
        return this.breadcrumbs.split("/").map((breadcrumb) => breadcrumb.trim()).filter((breadcrumb) => breadcrumb.length > 0);
    }
}
