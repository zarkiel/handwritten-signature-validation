import { Component, signal } from '@angular/core';
import { PageComponent } from "../../../common/layout/page/page.component";
import { PageHeaderComponent } from "../../../common/layout/page-header/page-header.component";
import { select } from '@ngxs/store';
import { AppState } from '../../../state/app/state';
import { AgGridModule } from 'ag-grid-angular';
import { ColDef, GetContextMenuItemsParams, GridApi, GridOptions, GridReadyEvent, MenuItemDef } from 'ag-grid-community';
import { AG_GRID_OPTIONS, AG_GRID_OPTIONS_BUTTON } from '../../../common/utils/constants';
import { SystemPage } from '../../../core/models/system_page';
import { Worker } from '../../../core/models/worker';
import { WorkerService } from '../../../core/services/worker.service';
import { UIService } from '../../../core/services/ui.service';
import { WorkersFormComponent } from '../workers-form/workers-form.component';
import { DialogService } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { AggridOptionsButtonComponent } from '../../../common/components/aggrid-options-button/aggrid-options-button.component';
import { Router } from '@angular/router';
import { DictionaryService } from '../../../core/services/dictionary.service';

@Component({
    selector: 'app-workers-list',
    imports: [PageComponent, PageHeaderComponent, AgGridModule],
    templateUrl: './workers-list.component.html',
    styleUrl: './workers-list.component.scss'
})
export class WorkersListComponent {
    pageName = "WorkersList"
    page = select(AppState.getPageByName(this.pageName))

    private gridApi!: GridApi<any>;
    gridOptions: GridOptions = { ...AG_GRID_OPTIONS };
    columnDefs: ColDef[] = [
        //{ field: 'id', headerName: 'ID' },
        {
            field: 'photo', headerName: 'Foto', cellRenderer: (params: any) => {
                return '<div class="text-center mt-1 mb-1"><img src="' + params.value + '" class="mainnav__avatar img-sm rounded-circle hv-oc" /></div>'
            }, filter: false, sortable: false
        },
        { field: 'name', headerName: 'Names' },
        { field: 'lastname1', headerName: 'First Lastname' },
        { field: 'lastname2', headerName: 'Second Lastname' },
        { field: 'document_number', headerName: 'Document Number' },
        
        AG_GRID_OPTIONS_BUTTON//{ field: '_menu', headerName: '', width: 50, cellRenderer: AggridOptionsButtonComponent}
    ];
    context: any;

    constructor(
        private workerService: WorkerService,
        private uiService: UIService,
        private dialogService: DialogService,
        private dictionaryService: DictionaryService,
        private messageService: MessageService,
        private router: Router
    ) {
        this.context = this;
    }

    ngOnInit() {

    }

    onGridReady(params: GridReadyEvent<any>) {
        this.gridApi = params.api;
        params.api!.setGridOption("serverSideDatasource", {
            getRows: (params) => {
                params.fail()
                this.workerService.gridRecords(params.request).subscribe(res => {
                    if (res.data && res.data.length > 0) {
                        params.success({
                            rowData: res.data,
                            //rowCount: 100,
                        });
                    } else {
                        params.fail();
                    }
                })
            },
        });
        this.gridApi.sizeColumnsToFit();
    }

    openFormNew(): void {
        this.openForm({} as Worker)
    }

    openForm(worker: Worker) {
        if(!worker.id){
            this.router.navigate(["administrative/workers/form"])
        }else{
            this.router.navigate(["administrative/workers/form", worker.id])
        }
        /* this.dialogService.open(WorkersFormComponent, {
            header: "Ficha de Colaborador",
            data: {
                item: worker
            },
            focusOnShow: false,
            modal: true,
            closable: true,
            //styleClass: 'no-scroll'
        }).onClose.subscribe(res => {
            if (res)
                this.gridApi.refreshServerSide()
            //this.getItems()
        }) */
    }


    delete(worker: Worker) {
        this.uiService.confirm('Are you sure you want to delete the record?', () => {
            this.workerService.deleteRecord(worker).subscribe(res => {
                this.messageService.add({ severity: "success", summary: "Operation Successful", detail: "Record deleted successfully" })
                this.gridApi.refreshServerSide()
            })
        })
    }

    getContextMenuItems(params: GetContextMenuItemsParams) {
        let options = [];
        const _this = params.context;
        const page: SystemPage = _this.page();

        const item: Worker = params.node?.data;

        if (item?.id != null) {

          
            options.push({
                name: 'Edit User',
                action: () => {
                    _this.openForm(item)
                },
                icon:
                    '<img src="img/icons/page_edit.ico">',
            })

        

        
            options.push({
                name: 'Delete User',
                action: () => {
                    _this.delete(item)
                },
                icon:
                    '<img src="img/icons/delete.ico">',
            })
        }

        //options = [...options, 'separator', 'excelExport']
        return options;
    }

}
