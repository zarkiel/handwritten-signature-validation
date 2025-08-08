import { Injectable, Injector, inject } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { UIService } from '../services/ui.service';
import { AuthService } from '../services/auth.service';
import { MessageService } from 'primeng/api';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private uiService: UIService,
        private authenticationService: AuthService,
        private messageService: MessageService) {
        
    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return next.handle(request)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    if (error instanceof HttpErrorResponse) {
                        console.log(error.error)
                        this.uiService.hideLoading(error.url ?? "").then(res => {

                            if(error.error.name && error.error.name == "JWT::ExpiredSignature"){
                                this.authenticationService.logout()
                            }

                            if(error.error.message){
                                //this.uiService.showAlert(error.error.message, "Error")
                                this.messageService.add({severity: "error", summary: "Operación Fallida", detail: error.error.message})
                            }else if(error.error.status == "VALIDATION_ERROR"){
                                const keys = Object.keys(error.error.errors)
                                //this.uiService.showAlert(error.error.errors[keys[0]][0])
                                this.messageService.add({severity: "error", summary: "Operación Fallida", detail: error.error.errors[keys[0]][0]})
                            }else if(error.error.error){
                                this.messageService.add({severity: "error", summary: "Operación Fallida", detail: error.error.error})
                            }
                            else if(error.message){
                                //this.uiService.showAlert(error.message, "Error")
                                this.messageService.add({severity: "error", summary: "Operación Fallida", detail: error.message})
                            }
                                
                        })
                    }

                    return throwError(() => error);
                })
            );
    }

}
