import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { StorageService } from "./storage.service";
import { Router } from "@angular/router";
import { CryptoService } from "./crypto.service";
import { ApiResponse } from "../models/request/api-response";
import { map } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class BaseService {

    BASE_API = environment.api;

    constructor(
        private http: HttpClient,
        public storageService: StorageService,
        public router: Router,
        public cryptoService: CryptoService
    ) {

    }

    post<T>(url: string, params: any, meta: any = {}) {
        return this.http.post<ApiResponse<string>>(this.BASE_API + url, { meta: meta, data: this.parseParams(params) }).pipe(map((res) => {
            return { ...res, data: environment.cryptData ? JSON.parse(this.cryptoService.decrypt(res.data)) as T : res.data as T }
        }));
    }

    postFD<T>(url: string, params: any, meta?: any) {
        const formData = this.objectToFormData({ meta: meta, data: this.parseParams(params)});
        
        return this.http.post<ApiResponse<string>>(this.BASE_API + url, formData).pipe(map((res) => {
            return { ...res, data: environment.cryptData ? JSON.parse(this.cryptoService.decrypt(res.data)) as T : res.data as T }
        }));
    }

    put<T>(url: string, params: any, meta: any = {}) {
        return this.http.put<ApiResponse<string>>(this.BASE_API + url, { meta: meta, data: this.parseParams(params) }).pipe(map((res) => {
            return { ...res, data: environment.cryptData ? JSON.parse(this.cryptoService.decrypt(res.data)) as T : res.data as T }
        }));
    }

    putFD<T>(url: string, params: any, meta?: any) {
        const formData = this.objectToFormData({ meta: meta, data: this.parseParams(params)});
        
        return this.http.put<ApiResponse<string>>(this.BASE_API + url, formData).pipe(map((res) => {
            return { ...res, data: environment.cryptData ? JSON.parse(this.cryptoService.decrypt(res.data)) as T : res.data as T }
        }));
    }

    get<T>(url: string, options = {}) {
        return this.http.get<ApiResponse<string>>(this.BASE_API + url, options).pipe(map((res) => {
            return { ...res, data: environment.cryptData ? JSON.parse(this.cryptoService.decrypt(res.data)) as T : res.data as T }
        }));
    }

    delete<T>(url: string) {
        return this.http.delete<ApiResponse<string>>(this.BASE_API + url).pipe(map((res) => {
            return { ...res, data: environment.cryptData ? JSON.parse(this.cryptoService.decrypt(res.data)) as T : res.data as T }
        }));
    }

    parseParams(params: any) {

        let crypted = params;
        if (environment.cryptData) {
            crypted = this.cryptoService.encrypt(JSON.stringify(params));
        }

        return crypted;
    }

    objectToFormData(obj: object, form?: FormData, namespace?: string): FormData {
        const fd = form || new FormData();
        let formKey: string;

        for (const property in obj) {
            if (Object.hasOwnProperty.call(obj, property)) {
                const value = (obj as any)[property]; // Use type assertion to access property

                // Skip if the value is null
                if (value === null) {
                    continue;
                }

                if (namespace) {
                    formKey = `${namespace}[${property}]`;
                } else {
                    formKey = property;
                }

                /* if(value instanceof File){
                    fd.append(formKey, value);
                }
                else  */if (typeof value === 'object' && !Array.isArray(value) && !(value instanceof File) && !(value instanceof Blob)) {
                    // It's a nested object, recursively call the function
                    //console.log(namespace + " -> " + formKey + ' -> ' + )
                    this.objectToFormData(value, fd, formKey);
                } else if (Array.isArray(value)) {
                    // It's an array
                    value.forEach((element, index) => {
                        // Skip if the array element is null
                        if (element === null) {
                            return; // Continue to the next element in the array
                        }

                        const arrayKey = `${formKey}[${index}]`;
                        if (typeof element === 'object' && element !== null && !Array.isArray(element) && !(element instanceof File) && !(element instanceof Blob)) {
                            // If the array element is an object (but not a File/Blob or another array), recursively call
                            this.objectToFormData(element, fd, arrayKey);
                        } else {
                            // If it's a primitive value, a File, or a Blob
                            fd.append(arrayKey, element);
                        }
                    });
                } else {
                    
                    // It's a primitive value (string, number, boolean) or a File/Blob instance
                    fd.append(formKey, value);
                }
            }
        }
        return fd;
    }
}