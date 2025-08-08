import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { CryptoService } from './crypto.service';

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    constructor(
        private cryptoService: CryptoService
    ) { }

    set(key: string, value: string) {
        localStorage.setItem(key, this.cryptoService.encrypt(value));
    }

    get(key: string) {
        const value = localStorage.getItem(key);

        return value ? this.cryptoService.decrypt(value) : null;
    }

    remove(key: string) {
        localStorage.removeItem(key);
    }

    has(key: string) {
        return localStorage.hasOwnProperty(key);
    }

}
