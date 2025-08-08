import { AggridOptionsButtonComponent } from "../components/aggrid-options-button/aggrid-options-button.component";
import { AG_GRID_LOCALE_ES } from "./i10n/ag-grid";

export const AG_GRID_OPTIONS: any = {
    defaultColDef: {
        editable: false,
        sortable: true,
        filter: 'agTextColumnFilter',
        filterParams: {
            filterType: 'text',
            type: 'contains',
            //suppressAndOrCondition: true,
            maxNumConditions: 1,
            
            buttons: ['apply', 'reset']
        },
        resizable: true,        
        minWidth: 100               
    },
    rowModelType: "serverSide",
    pagination: true,
    paginationPageSize: 50,
    //paginationAutoPageSize: true,
    rowSelection: undefined,
    localeText: AG_GRID_LOCALE_ES,
    getContextMenuItems: [],
    sideBar: {
        toolPanels: ["filters"],
        hiddenByDefault: false
    },
    /* onCellClicked: (params: any) => {  
        
        params.api.showContextMenu({
            rowNode: params.node,
            column: params.column,
            value: params.value
        });
        
        params.api.contextMenuFactory.showMenu(
           params.node, 
           params.column, 
           params.value,   
           params.event
        )
        
    } */
    
    //rowGroupPanelShow: 'always'
    //suppressContextMenu: true,
    /*onFirstDataRendered: function(params: any){
        params.api.sizeColumnsToFit({
            defaultMinWidth: 100,
            columnLimits: [{ key: 'id', maxWidth: 100 }],
        });
    }*/
}

export const AG_GRID_OPTIONS_BUTTON = { field: '_menu', headerName: '', sortable: false, filter: false, width: 50, cellRenderer: AggridOptionsButtonComponent}