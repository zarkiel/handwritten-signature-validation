import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { IAppState } from '../../state/app/state';

@Injectable({
    providedIn: 'root'
})
export class SessionService extends BaseService{

    private SUB_PATH = "/session"

    getInitialState(){
       return this.get<IAppState>(this.SUB_PATH + "/initial_state")
    }
    
    getOrganizationChart(){
       return this.get<any>(this.SUB_PATH + "/organization_chart")
    }
}