import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { UIService } from '../services/ui.service';
import { StorageService } from '../services/storage.service';


@Injectable()
export class RequestInterceptor implements HttpInterceptor {

    constructor(
        private uiService: UIService,
        private authenticationService: AuthService,
        private storageService: StorageService
    ){

    }

    intercept(
        req: HttpRequest<unknown>,
        next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
        let request = req;
        
        console.log()
        const loaderHeader = req.headers.get("X-Loader");

        if(loaderHeader != "No-Loader")
            this.uiService.showLoading(req.url)
        //console.log("show:" + req.url)

        /*
        request = request.clone({
            headers: request.headers.append('Content-Type', 'application/json'),
        });
        request = request.clone({
            headers: request.headers.append('Accept', 'application/json'),
        });
        */

        //console.log('xx')
        
        if(this.authenticationService.isLoggedIn()){
            const token = this.storageService.get("token");
            request = request.clone({
                headers: request.headers.append('Authorization', 'Bearer ' + token),
            });
        }

        return next.handle(request).pipe(
            finalize(() => {
                //console.log("hide:" + req.url)
                this.uiService.hideLoading(req.url)
            })
        );
    }
}
