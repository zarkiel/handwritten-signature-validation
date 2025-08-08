import { computed, Injectable } from '@angular/core';
import { BaseService } from './base.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService extends BaseService{
    isLoggedIn(){
        return computed(() => this.storageService.has('token'));
    }

    logout(){
        this.storageService.remove('token');
        this.router.navigate(["/login"])
    }

    requestLogin(data: any){
        return this.post<{token: string, roles: string[]}>('/auth/login', data);
    }

    permitLogin(token: string): void{
        this.storageService.set("token", token);
        this.router.navigate(["/"])
    }
}
