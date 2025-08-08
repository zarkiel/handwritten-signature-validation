import { Injectable } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Router } from '@angular/router';
import { LoaderComponent } from '../../common/components/loader/loader.component';

@Injectable({
    providedIn: 'root'
})
export class UIService {

    loaders: any = {};

    constructor(
        
        private confirmationService: ConfirmationService,
        private dialogService: DialogService,
        private bimestreDialogService: DialogService,
        private router: Router,
        
    ) {

    }

    async showLoading(url: string) {
        this.loaders[url] = this.dialogService.open(LoaderComponent, {
            showHeader: false,
            modal: true,
            closable: false,
            styleClass: "page-loader",
        })

        /*
        if (this.loaders[url])
            this.loaders[url].dismiss()

        this.loaders[url] = await this.loadingController.create({
            message: 'Cargando...'// + url,
            //duration: 3000,
        });
        //console.log(this.loaders[url])
        this.loaders[url].present();
        */
    }

    async hideLoading(url: string) {
        if (this.loaders[url])
            this.loaders[url].close();
    }

    async confirm(message: string, callbackYes: any, callbackNo?: any) {

        this.confirmationService.confirm({
            message: message,
            header: 'Confirmación',
            icon: 'pi pi-info-circle',
            acceptButtonStyleClass: "p-button-danger p-button-text",
            rejectButtonStyleClass: "p-button-text p-button-text",
            
            acceptLabel: "Si",
            rejectLabel: "No",
            accept: callbackYes,
            defaultFocus: "no"
        });
    }
}
