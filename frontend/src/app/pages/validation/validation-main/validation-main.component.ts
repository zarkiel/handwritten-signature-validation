import { Component, inject, signal } from '@angular/core';
import { AppState } from '../../../state/app/state';
import { select } from '@ngxs/store';
import { PageComponent } from "../../../common/layout/page/page.component";
import { PageHeaderComponent } from "../../../common/layout/page-header/page-header.component";
import { FileUtils } from '../../../common/utils/file-utils';
import { ValidationService } from '../../../core/services/validation.service';
import { FormsModule } from '@angular/forms';
import { CustomerService } from '../../../core/services/customer.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { SelectModule } from 'primeng/select';
import { Customer } from '../../../core/models/customer';
import { DialogService } from 'primeng/dynamicdialog';
import { ValidationResultsComponent } from '../validation-results/validation-results.component';

@Component({
  selector: 'app-validation-main',
  imports: [PageComponent, PageHeaderComponent, FormsModule, SelectModule],
  templateUrl: './validation-main.component.html',
  styleUrl: './validation-main.component.scss'
})
export class ValidationMainComponent {
    pageName = "ValidationMain";
    page = select(AppState.getPageByName(this.pageName));

    images = signal<any[]>([]);
    imageToVerify = signal<any>("");
    imageType = signal<any>("document");

    customerService = inject(CustomerService);

    customers = toSignal(this.customerService.allRecords().pipe(map((res: any) => res.data)), { initialValue: [] });
    customer = signal<Customer>({} as Customer);

    constructor(
        private validationService: ValidationService,
        private dialogService: DialogService
    ){}

    selectImage(collection: string) {
        var input = document.createElement('input');
        input.accept = ".png, .jpg, .jpeg"
        input.type = 'file';

        input.onchange = async (e: any) => {
            var file: File = e.target.files[0];
            this.addImage(file, collection)
        }

        input.click();
    }

    selectCustomer(event: any){
        this.customer.set(event.value);
        this.images.set(event.value.images);
    }

    async addImage(file: any, collection: string){
        if(collection == "images"){
            this.images.set([...this.images(), await FileUtils.toBase64(file)])
        }else{
            this.imageToVerify.set(await FileUtils.toBase64(file))
        }

    }

    removeImage(indexForDelete: number) {
        this.images.set(this.images().filter((image, index) => index != indexForDelete))
    }

    validateSignature(){
        this.validationService.validateSignature({
            imageToVerify: this.imageToVerify(),
            images: this.images(),
            imageType: this.imageType()
        }).subscribe((res: any) => {
            this.dialogService.open(ValidationResultsComponent, {
                header: "Resultado de la Validación",
                data: {
                    results: res
                },
                modal: true,
                closable: true
            })
        })
    }
}
