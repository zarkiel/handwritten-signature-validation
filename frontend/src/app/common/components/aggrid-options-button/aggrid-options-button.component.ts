import { Component, computed, signal } from '@angular/core';
import { GridApi, ICellRendererParams } from 'ag-grid-community';

@Component({
    selector: 'app-aggrid-options-button',
    imports: [],
    templateUrl: './aggrid-options-button.component.html',
    styleUrl: './aggrid-options-button.component.scss'
})
export class AggridOptionsButtonComponent {
    public params!: ICellRendererParams;
    value = signal(undefined);

    agInit(params: ICellRendererParams): void {
        this.value.set(params.value);
        this.params = params;
    }

    refresh(params: ICellRendererParams) {
        return false;
    }

    openContext(event: MouseEvent) {
        this.params.api.showContextMenu({
            column: this.params.column,
            rowNode: this.params.node,
            x: event.clientX,
            y: event.clientY,
            value: this.params.value,
            source: 'api'
        });
    }
}
