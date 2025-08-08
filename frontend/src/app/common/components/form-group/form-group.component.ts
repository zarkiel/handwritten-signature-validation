import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { TextareaModule  } from 'primeng/textarea';
@Component({
    selector: 'app-form-group',
    templateUrl: './form-group.component.html',
    styleUrls: ['./form-group.component.scss'],
    standalone: true,
    imports: [CommonModule, InputTextModule, ReactiveFormsModule, PasswordModule, TextareaModule, FormsModule]
})
export class FormGroupComponent implements OnInit {
    @Input() groupType: "block"|"inline" = "block"
    @Input() type: string = "text"
    @Input({ required: true }) label!: string;
    @Input({ required: true }) name!: string;
    @Input() selectOptions: {label: string, value: any}[] = [];
    @Input() selectValues: string[] = [];
    @Input() readonly = false;
    @Input() classes = "col-12"

    form!: FormGroup;

    constructor(private rootFormGroup: FormGroupDirective) {
        
    }

    ngOnInit(): void {
        this.form = this.rootFormGroup.control;
    }

    isRequired(name: string){
        return this.form.get(name)?.hasValidator(Validators.required);
    }

    isInvalid(name: string){
        return (this.form.get(name)?.touched || this.form.get(name)?.dirty) && this.form.get(name)?.invalid;
    }

    hasError(name: string, error: string){
        return this.form.get(name)?.errors?.[error]
    }
}
