import { Component, signal } from '@angular/core';
import { PageComponent } from "../../../common/layout/page/page.component";
import { PageHeaderComponent } from "../../../common/layout/page-header/page-header.component";
import { select } from '@ngxs/store';
import { AppState } from '../../../state/app/state';
import { AgGridModule } from 'ag-grid-angular';
import { ColDef, GetContextMenuItemsParams, GridApi, GridOptions, GridReadyEvent, MenuItemDef } from 'ag-grid-community';
import { AG_GRID_OPTIONS, AG_GRID_OPTIONS_BUTTON } from '../../../common/utils/constants';
import { SystemPage } from '../../../core/models/system_page';
import { Customer } from '../../../core/models/customer';
import { CustomerService } from '../../../core/services/customer.service';
import { UIService } from '../../../core/services/ui.service';
import { CustomersFormComponent } from '../customers-form/customers-form.component';
import { DialogService } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
    selector: 'app-customers-list',
    imports: [PageComponent, PageHeaderComponent, AgGridModule],
    templateUrl: './customers-list.component.html',
    styleUrl: './customers-list.component.scss'
})
export class CustomersListComponent {
    pageName = "CustomersList"
    page = select(AppState.getPageByName(this.pageName))

    private gridApi!: GridApi<any>;
    gridOptions: GridOptions = { ...AG_GRID_OPTIONS };
    columnDefs: ColDef[] = [
        //{ field: 'id', headerName: 'ID' },
        { field: 'name', headerName: 'Names' },
        { field: 'lastname1', headerName: 'First Lastname' },
        { field: 'lastname2', headerName: 'Second Lastname' },
        { field: 'document_type.name', headerName: 'Document Type' },
        { field: 'document_number', headerName: 'Document Number' },
        AG_GRID_OPTIONS_BUTTON
    ];
    context: any;

    constructor(
        private customerService: CustomerService,
        private uiService: UIService,
        private dialogService: DialogService,
        private messageService: MessageService,
        private router: Router
    ) {
        this.context = this;
    }

    ngOnInit(){
        
    }

    onGridReady(params: GridReadyEvent<any>) {
        this.gridApi = params.api;
        params.api!.setGridOption("serverSideDatasource", {
            getRows: (params) => {
                params.fail()
                this.customerService.gridRecords(params.request).subscribe(res => {
                    if (res.data && res.data.length > 0) {
                        params.success({
                            rowData: res.data,
                            //rowCount: response.lastRow,
                        });
                    }else{
                        params.fail();
                    }
                })
            },
        });
        this.gridApi.sizeColumnsToFit();
    }

    openFormNew(): void {
        this.openForm({} as Customer)
    }

    openForm(customer: Customer) {
        if(!customer.id){
            this.router.navigate(["administrative/customers/form"])
        }else{
            this.router.navigate(["administrative/customers/form", customer.id])
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


    delete(customer: Customer) {
        this.uiService.confirm('Are you sure you want to delete the record?', () => {
            this.customerService.deleteRecord(customer).subscribe(res => {
                this.messageService.add({ severity: "success", summary: "Operation Successful", detail: "Record deleted successfully" })
                this.gridApi.refreshServerSide()
            })
        })
    }

    getContextMenuItems(params: GetContextMenuItemsParams) {
        let options = [];
        const _this = params.context;
        const page: SystemPage = _this.page();

        const item: Customer = params.node?.data;

        if (item?.id != null) {

            if (page.can('update')) {

                options.push({
                    name: 'Edit Customer',
                    action: () => {
                        _this.openForm(item)
                    },
                    icon:
                        '<img src="img/icons/page_edit.ico">',
                })

            }

            if (page.can('delete')){
                options.push({
                    name: 'Delete Customer',
                    action: () => {
                        _this.delete(item)
                    },
                    icon:
                        '<img src="img/icons/delete.ico">',
                })
            }
                
        }

        //options = [...options, 'separator', 'excelExport']
        return options;
    }

}
