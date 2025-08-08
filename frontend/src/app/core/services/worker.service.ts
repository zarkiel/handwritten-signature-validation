import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Worker } from '../models/worker';

@Injectable({
    providedIn: 'root'
})
export class WorkerService extends BaseService {
    SUB_PATH = "/workers";

    gridRecords(gridRequest: any) {
        return this.post<Worker[]>(this.SUB_PATH + "/grid?", gridRequest)
    }

    showRecord(worker: Worker) {
        return this.get<Worker>(this.SUB_PATH + "/" + worker.id)
    }

    updateRecord(worker: Worker, meta?: any) {
        return this.putFD<Worker>(this.SUB_PATH + "/" + worker.id, worker, meta)
    }

    createRecord(worker: Worker, meta = {}) {
        return this.postFD<Worker>(this.SUB_PATH, worker, meta)
    }

    deleteRecord(worker: Worker) {
        return this.delete<Worker>(this.SUB_PATH + "/" + worker.id)
    }
}