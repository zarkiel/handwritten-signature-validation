import { Component, inject, Signal, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PageComponent } from "../../../common/layout/page/page.component";
import { select } from '@ngxs/store';
import { AppState } from '../../../state/app/state';
import { FormGroupComponent } from '../../../common/components/form-group/form-group.component';
import { WorkerService } from '../../../core/services/worker.service';
import { Worker } from '../../../core/models/worker';
import { Select } from 'primeng/select';
import { FileUtils } from '../../../common/utils/file-utils';
import { MessageService } from 'primeng/api';
import { TreeSelectModule } from 'primeng/treeselect';
import { ActivatedRoute, Router } from '@angular/router';
import { PageHeaderComponent } from "../../../common/layout/page-header/page-header.component";
import { CommonModule, Location } from '@angular/common';

import { toSignal } from '@angular/core/rxjs-interop';
import { DictionaryService } from '../../../core/services/dictionary.service';



@Component({
    selector: 'app-workers-form',
    imports: [PageComponent, ReactiveFormsModule, FormGroupComponent, Select, TreeSelectModule, PageHeaderComponent, FormsModule],
    templateUrl: './workers-form.component.html',
    styleUrl: './workers-form.component.scss'
})
export class WorkersFormComponent {
    pageName = "WorkersForm"
    page = select(AppState.getPageByName(this.pageName))


    dictionaryService = inject(DictionaryService);


    documentTypes = toSignal(this.dictionaryService.allRecords('document_types'));


    files: any = {
        photo: null,
    }

    previews: any = {
        photo: null,
    }

    item!: Worker;
    form!: FormGroup;

    districts = signal<any[]>([]);

    constructor(
        //private dialogRef: DynamicDialogRef,
        private formBuilder: FormBuilder,
        private workerService: WorkerService,
        private messageService: MessageService,
        
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private location: Location
    
    ) {
        //this.item = this.dialogConfig.data.item;
        this.item = { id: activatedRoute.snapshot.params["id"] } as Worker
    }

    ngOnInit() {
        //console.log(this.documentTypes())


        this.form = this.formBuilder.group({
            name: ["", Validators.required],
            lastname1: ["", Validators.required],
            lastname2: ["", Validators.required],
            document_type: [null, Validators.required],
            document_number: ["", Validators.required],
        })


        
        

        if (this.item && this.item.id) {
            this.workerService.showRecord(this.item).subscribe(res => {
                this.item = res.data;
                
                this.previews.photo = this.item.photo;
    

                this.form.setValue({
                    name: this.item.name,
                    lastname1: this.item.lastname1,
                    lastname2: this.item.lastname2,
                    document_type: this.item.document_type,
                    document_number: this.item.document_number,
                    
                })
            })
        }
    }

    async pickFile(event: Event, key: string) {
        this.files[key] = await this.onFilePicked(event)
        //console.log(this.files)
        if (key == "photo")
           this.previews.photo = await FileUtils.toBase64(this.files[key]) as string
    }

    async onFilePickedInfo(event: Event) {
        const field: any = (event?.target as HTMLInputElement);
        const file = field?.files[0]

        return {
            info: {
                name: file.name,
                type: file.type,
                size: file.size
            },
            data: await FileUtils.toBase64(file)
        }

        //return await FileUtils.toBase64(file) as string
    }

    async onFilePicked(event: Event) {
        const field: any = (event?.target as HTMLInputElement);
        const file = field?.files[0];
        
        return file;
    }


    sendForm(): void {
        

        const data = { ...this.item, ...{ ...this.form.value } }


        if (this.item && this.item.id) {
            this.workerService.updateRecord(data, this.files).subscribe(res => {
                this.messageService.add({ severity: 'success', summary: 'Operación Exitosa', detail: 'Guardado con éxito' });
                //this.dialogRef.close(res.data)
                //this.router.navigate([-1]);
                this.location.back()
            });
        } else {
            this.workerService.createRecord(data, this.files).subscribe(res => {
                this.messageService.add({ severity: 'success', summary: 'Operación Exitosa', detail: 'Guardado con éxito' });
                //this.dialogRef.close(res.data)
                this.location.back()
            });
        }
    }

    closeModal() {
        this.location.back()
        //this.dialogRef.close(false)
    }
}
