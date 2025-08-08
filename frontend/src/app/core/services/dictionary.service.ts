import { Injectable } from '@angular/core';
import { ApiResponse } from "../models/request/api-response"
import { Dictionary } from '../models/dictionary';
import { BaseService } from './base.service';

@Injectable({
    providedIn: 'root'
})
export class DictionaryService extends BaseService{
    private SUB_PATH = "/dictionaries"

    allRecords(_prefix: string){
        return this.get<Dictionary[]>(this.SUB_PATH + "/" + _prefix)
    }

    allRecordsSilent(_prefix: string){
        return this.get<Dictionary[]>(this.SUB_PATH + "/" + _prefix, {
            headers: {
                "X-Loader": "No-Loader"
            }
        })
    }

    showRecord(dictionary: Dictionary, _prefix: string){
        return this.get<Dictionary>(this.SUB_PATH + "/" + _prefix + "/" + dictionary.id)
    }

    gridRecords(gridRequest: any, _prefix: string){
        return this.post<Dictionary[]>(this.SUB_PATH + "/" + _prefix + "/grid", gridRequest)
    }

    createRecord(dictionary: Dictionary, _prefix: string, meta = {}){
        return this.post<Dictionary>(this.SUB_PATH + "/" + _prefix, dictionary, meta)
    }

    updateRecord(dictionary: Dictionary, _prefix: string, meta = {}){
        return this.put<Dictionary>(this.SUB_PATH + "/" + _prefix + "/" + dictionary.id, dictionary, meta)
    }

    deleteRecord(dictionary: Dictionary, _prefix: string){
        return this.delete<Dictionary>(this.SUB_PATH + "/" + _prefix + "/" + dictionary.id)
    }
}
