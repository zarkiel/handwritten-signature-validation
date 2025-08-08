import { Component, Input } from '@angular/core';
import { select } from '@ngxs/store';
import { AppState } from '../../../state/app/state';
import { ErrorPageComponent } from "../../components/error-page/error-page.component";

@Component({
    selector: 'app-page',
    //imports: [ErrorPageComponent],
    templateUrl: './page.component.html',
    styleUrl: './page.component.scss'
})
export class PageComponent {
    @Input({required: true}) name = "";
    @Input() operation = "";

    pages = select(AppState.pages)

    constructor(){
        
    }

    getPage(){
        return this.pages().find(page => page.name == this.name)
    }
}
