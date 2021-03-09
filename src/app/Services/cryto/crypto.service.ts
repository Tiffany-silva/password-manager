import {Injectable} from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
	providedIn: 'root'
})
export class CryptoService {

	constructor() {
	}

	//encrypts the value
	set(keys, value) {
		let key = CryptoJS.enc.Utf8.parse(keys);
		let iv = CryptoJS.enc.Utf8.parse(keys);
		let encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(value.toString()), key,
			{
				keySize: 128 / 8,
				iv: iv,
				mode: CryptoJS.mode.CBC,
				padding: CryptoJS.pad.Pkcs7
			});
		return encrypted.toString();

	}

	//decrypts the value
	get(keys, value) {
		let key = CryptoJS.enc.Utf8.parse(keys);
		let iv = CryptoJS.enc.Utf8.parse(keys);
		console.log(keys);
		console.log(value);
		let decrypted = CryptoJS.AES.decrypt(value, key, {
			keySize: 128 / 8,
			iv: iv,
			mode: CryptoJS.mode.CBC,
			padding: CryptoJS.pad.Pkcs7
		});
		console.log(decrypted.toString());
		return decrypted.toString(CryptoJS.enc.Utf8);
	}
}
