import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PageComponent } from "../../../common/layout/page/page.component";
import { select } from '@ngxs/store';
import { AppState } from '../../../state/app/state';
import { FormGroupComponent } from '../../../common/components/form-group/form-group.component';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DictionaryService } from '../../../core/services/dictionary.service';
import { Dictionary } from '../../../core/models/dictionary';
import { MessageService } from 'primeng/api';


@Component({
    selector: 'app-dictionaries-form',
    imports: [PageComponent, ReactiveFormsModule, FormGroupComponent],
    templateUrl: './dictionaries-form.component.html',
    styleUrl: './dictionaries-form.component.scss'
})
export class DictionariesFormComponent {
    pageName = "DictionariesForm"
    page = select(AppState.getPageByName(this.pageName))

    item!: Dictionary;
    form!: FormGroup;
    _prefix!: string;

    constructor(
        private dialogRef: DynamicDialogRef,
        private formBuilder: FormBuilder,
        private dictionaryService: DictionaryService,
        private dialogConfig: DynamicDialogConfig,
        private messageService: MessageService,

    ){
        this.item = this.dialogConfig.data.item;
        this._prefix = this.dialogConfig.data._prefix;
        
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            name: ["", Validators.required],
            description: [""],
        })

        if(this.item && this.item.id){
            this.dictionaryService.showRecord(this.item, this._prefix).subscribe(res => {
                this.item = res.data;
                this.form.setValue({
                    name: this.item.name,
                    description: this.item.description

                })
            })
        }
    }

    sendForm(): void{
        const data = {...this.item, ...this.form.value}

        if(this.item && this.item.id){
            this.dictionaryService.updateRecord(data, this._prefix).subscribe(res => {
                this.messageService.add({ severity: 'success', summary: 'Operación Exitosa', detail: 'Guardado con éxito'});
                this.dialogRef.close(res.data)
            });
        }else{
            this.dictionaryService.createRecord(data, this._prefix).subscribe(res => {
                this.messageService.add({ severity: 'success', summary: 'Operación Exitosa', detail: 'Guardado con éxito' });
                this.dialogRef.close(res.data)
            });
        }
    }

    closeModal(){
        this.dialogRef.close(false)
    }
}
