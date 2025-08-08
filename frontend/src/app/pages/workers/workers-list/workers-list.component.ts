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
        { field: 'name', headerName: 'Nombres' },
        { field: 'lastname1', headerName: 'Primer Apellido' },
        { field: 'lastname2', headerName: 'Segundo Apellido' },
        { field: 'document_number', headerName: 'Nº de Documento' },
        
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
        this.uiService.confirm('¿Está seguro de borrar el registro?', () => {
            this.workerService.deleteRecord(worker).subscribe(res => {
                this.messageService.add({ severity: "success", summary: "Operación Exitosa", detail: "Registro borrado con éxito" })
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
                name: 'Editar Usuario',
                action: () => {
                    _this.openForm(item)
                },
                icon:
                    '<img src="img/icons/page_edit.ico">',
            })

        

        
            options.push({
                name: 'Borrar Usuario',
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
