import { Injectable } from '@angular/core';
import { ApiResponse } from "../models/request/api-response"
import { Customer } from '../models/customer';
import { BaseService } from './base.service';

@Injectable({
    providedIn: 'root'
})
export class ValidationService extends BaseService{
    override BASE_API = "http://localhost:5000";
    private SUB_PATH = "/verify"

    validateSignature(data: any){
        return this.post<any>(this.SUB_PATH, data)
    }

}
