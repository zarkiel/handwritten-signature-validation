import { Injectable } from '@angular/core';
import { ApiResponse } from "../models/request/api-response"
import { Customer } from '../models/customer';
import { BaseService } from './base.service';

@Injectable({
    providedIn: 'root'
})
export class CustomerService extends BaseService{
    private SUB_PATH = "/customers"

    allRecords(){
        return this.get<Customer[]>(this.SUB_PATH)
    }

    showRecord(customer: Customer){
        return this.get<Customer>(this.SUB_PATH + "/" + customer.id)
    }

    gridRecords(gridRequest: any){
        return this.post<Customer[]>(this.SUB_PATH + "/grid?", gridRequest)
    }

    createRecord(customer: Customer, meta = {}){
        return this.postFD<Customer>(this.SUB_PATH, customer, meta)
    }

    updateRecord(customer: Customer, meta = {}){
        return this.putFD<Customer>(this.SUB_PATH + "/" + customer.id, customer, meta)
    }

    deleteRecord(customer: Customer){
        return this.delete<Customer>(this.SUB_PATH + "/" + customer.id)
    }
}
