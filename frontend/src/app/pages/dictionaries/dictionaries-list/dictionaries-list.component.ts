import { Component, signal } from '@angular/core';
import { PageComponent } from "../../../common/layout/page/page.component";
import { PageHeaderComponent } from "../../../common/layout/page-header/page-header.component";
import { select } from '@ngxs/store';
import { AppState } from '../../../state/app/state';
import { AgGridModule } from 'ag-grid-angular';
import { ColDef, GetContextMenuItemsParams, GridApi, GridOptions, GridReadyEvent, MenuItemDef } from 'ag-grid-community';
import { AG_GRID_OPTIONS, AG_GRID_OPTIONS_BUTTON } from '../../../common/utils/constants';
import { SystemPage } from '../../../core/models/system_page';
import { Dictionary } from '../../../core/models/dictionary';
import { DictionaryService } from '../../../core/services/dictionary.service';
import { UIService } from '../../../core/services/ui.service';
import { DictionariesFormComponent } from '../dictionaries-form/dictionaries-form.component';
import { DialogService } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-dictionaries-list',
    imports: [PageComponent, PageHeaderComponent, AgGridModule],
    templateUrl: './dictionaries-list.component.html',
    styleUrl: './dictionaries-list.component.scss'
})
export class DictionariesListComponent {
    pageName = "DictionariesList"
    page = select(AppState.getPageByName(this.pageName))

    private gridApi!: GridApi<any>;
    private gridParams!: GridReadyEvent<any>;

    gridOptions: GridOptions = { ...AG_GRID_OPTIONS };
    columnDefs: ColDef[] = [
        //{ field: 'id', headerName: 'ID' },
        { field: 'name', headerName: 'Nombre' },
        { field: 'description', headerName: 'Descripción' },
        AG_GRID_OPTIONS_BUTTON
    ];
    context: any;
    _prefix!: string;

    texts: any = {
        "genders": {
            singular: "Género",
            plural: 'Géneros'
        },
        "banks": {
            singular: "Banco",
            plural: 'Bancos'
        },
        "bank_account_types": {
            singular: "Tipo de Cuenta",
            plural: 'Tipos de Cuentas Bancarias'
        },
        "marital_statuses": {
            singular: "Estado Civil",
            plural: 'Estados Civiles'
        },
        "worker_payment_methods": {
            singular: "Método de Pago",
            plural: 'Métodos de Pago'
        },
        "countries": {
            singular: "País",
            plural: 'Paises'
        },
        "document_types": {
            singular: "Tipo de Documento",
            plural: 'Tipos de Documentos'
        },
        "educational_situations": {
            singular: "Situación Educativa",
            plural: 'Situaciones Educativas'
        },
        "educational_center_types": {
            singular: "Tipo de Centro Educativo",
            plural: 'Tipos de Centros Educativos'
        },
        "blood_types": {
            singular: "Tipo de Sangre",
            plural: 'Tipos de Sangre'
        },
        "worker_garments": {
            singular: "Indumentaria",
            plural: 'Indumentaria'
        }
    }

    _text!: { singular: string, plural: string };
    private routeSubscription: Subscription | undefined;

    constructor(
        private dictionaryService: DictionaryService,
        private uiService: UIService,
        private dialogService: DialogService,
        private messageService: MessageService,
        private activatedRoute: ActivatedRoute
    ) {
        this.context = this;
        this._prefix = activatedRoute.snapshot.params['_prefix'];

        
    }

    ngOnInit() {
        this.routeSubscription = this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
            const prefix = params.get('_prefix');
            if(prefix){
                this._prefix = prefix;
                this._text = this.texts[this._prefix];
                this.setDatasource(this.gridParams);
            }
                
        });
        
    }

    onGridReady(params: GridReadyEvent<any>){
        this.gridApi = params.api;
        this.gridParams = params;
        this.setDatasource(this.gridParams);
    }

    setDatasource(params: GridReadyEvent<any>) {
        
        params.api!.setGridOption("serverSideDatasource", {
            getRows: (params) => {
                params.fail()

                this.dictionaryService.gridRecords(params.request, this._prefix).subscribe(res => {
                    if (res.data && res.data.length > 0) {
                        params.success({
                            rowData: res.data,
                            //rowCount: response.lastRow,
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
        this.openForm({} as Dictionary)
    }

    openForm(dictionary: Dictionary) {
        this.dialogService.open(DictionariesFormComponent, {
            header: this._text.singular,
            data: {
                item: dictionary,
                _prefix: this._prefix
            },
            focusOnShow: false,
            modal: true,
            closable: true
        }).onClose.subscribe(res => {
            if (res)
                this.gridApi.refreshServerSide()
            //this.getItems()
        })
    }


    delete(dictionary: Dictionary) {
        this.uiService.confirm('¿Está seguro de borrar el registro?', () => {
            this.dictionaryService.deleteRecord(dictionary, this._prefix).subscribe(res => {
                this.messageService.add({ severity: "success", summary: "Operación Exitosa", detail: "Registro borrado con éxito" })
                this.gridApi.refreshServerSide()
            })
        })
    }

    getContextMenuItems(params: GetContextMenuItemsParams) {
        let options = [];
        const _this = params.context;
        const page: SystemPage = _this.page();

        const item: Dictionary = params.node?.data;

        if (item?.id != null) {

            if (page.can(_this._prefix + '_update')) {

                options.push({
                    name: 'Editar ' + _this._text.singular,
                    action: () => {
                        _this.openForm(item)
                    },
                    icon:
                        '<img src="img/icons/page_edit.ico">',
                })

            }

            if (page.can(_this._prefix + '_delete'))
                options.push({
                    name: 'Borrar ' + _this._text.singular,
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
