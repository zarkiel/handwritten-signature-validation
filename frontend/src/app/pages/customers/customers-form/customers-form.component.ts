import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PageComponent } from "../../../common/layout/page/page.component";
import { select } from '@ngxs/store';
import { AppState } from '../../../state/app/state';
import { FormGroupComponent } from '../../../common/components/form-group/form-group.component';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CustomerService } from '../../../core/services/customer.service';
import { Customer } from '../../../core/models/customer';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { DictionaryService } from '../../../core/services/dictionary.service';
import { CommonModule, Location } from '@angular/common';
import { PageHeaderComponent } from '../../../common/layout/page-header/page-header.component';
import { SelectModule } from 'primeng/select';
import { FileUtils } from '../../../common/utils/file-utils';

@Component({
    selector: 'app-customers-form',
    imports: [PageComponent, ReactiveFormsModule, FormGroupComponent, PageHeaderComponent, SelectModule],
    templateUrl: './customers-form.component.html',
    styleUrl: './customers-form.component.scss'
})
export class CustomersFormComponent {
    pageName = "CustomersForm"
    page = select(AppState.getPageByName(this.pageName))

    item!: Customer;
    form!: FormGroup;

    dictionaryService = inject(DictionaryService);
    documentTypes = toSignal(this.dictionaryService.allRecords('document_types'));
    images = signal<any[]>([]);

    constructor(

        private formBuilder: FormBuilder,
        private customerService: CustomerService,
        private messageService: MessageService,
        private activatedRoute: ActivatedRoute,
        private location: Location
    ){
        this.item = { id: activatedRoute.snapshot.params["id"] } as Customer
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            name: ["", Validators.required],
            lastname1: ["", Validators.required],
            lastname2: ["", Validators.required],
            document_type: [null, Validators.required],
            document_number: ["", Validators.required],
        })

        if(this.item && this.item.id){
            this.customerService.showRecord(this.item).subscribe(res => {
                this.item = res.data;
                this.form.setValue({
                    name: this.item.name,
                    lastname1: this.item.lastname1,
                    lastname2: this.item.lastname2,
                    document_type: this.item.document_type,
                    document_number: this.item.document_number,
                    
                })

                if(this.item.images.length > 0){
                    this.item.images.forEach((photo: any) =>{
                        const filename = photo.split('/').pop().split('?')[0];
                        //FileUtils.urlToFile(photo, filename).then((file: any) => this.addPhoto(file))
                        this.addImage(photo, 'url')
                    });
                }
            })
        }
    }

    selectImage() {
        var input = document.createElement('input');
        input.accept = ".png, .jpg, .jpeg"
        input.type = 'file';

        input.onchange = async (e: any) => {
            var file: File = e.target.files[0];
            this.addImage(file)
        }

        input.click();
    }

    async addImage(file: any, type: string = 'file'){
        
        this.images.set([...this.images(), {
            file: file,
            type: type,
            data: type == 'file' ? await FileUtils.toBase64(file) : file,
        }])

    }

    removeImage(indexForDelete: number) {
        this.images.set(this.images().filter((image, index) => index != indexForDelete))
    }

    sendForm(): void{
        const data = {...this.item, ...this.form.value}

        if(this.item && this.item.id){
            this.customerService.updateRecord(data, this.images().map(photo => {
                return {file: photo.file, type: photo.type};
            })).subscribe(res => {
                this.messageService.add({ severity: 'success', summary: 'Operación Exitosa', detail: 'Guardado con éxito'});
                //this.dialogRef.close(res.data)
                this.location.back()
            });
        }else{
            this.customerService.createRecord(data, this.images().map(photo => {
                return {file: photo.file, type: photo.type};
            })).subscribe(res => {
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
