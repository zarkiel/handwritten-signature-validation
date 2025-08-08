import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
    providedIn: 'root'
})
export class CryptoService {
    constructor() { }

    key = "000102030405060708090a0b0c0d0e0f";
    iv = "101112131415161718191a1b1c1d1e1f";

    encrypt(txt: string): string {
        return CryptoJS.AES.encrypt(txt, CryptoJS.enc.Hex.parse(this.key), {
            iv: CryptoJS.enc.Hex.parse(this.iv),
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        }).toString();
    }

 
    decrypt(txtToDecrypt: string) {
        const decrypted = CryptoJS.AES.decrypt(txtToDecrypt, CryptoJS.enc.Hex.parse(this.key), {
            iv: CryptoJS.enc.Hex.parse(this.iv),
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });

        return decrypted.toString(CryptoJS.enc.Utf8);
    }
}