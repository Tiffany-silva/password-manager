import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {TokenStorageService} from '../token-storage/token-storage.service';

@Injectable({
	providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

	constructor(public token: TokenStorageService, public router: Router) {
	}

	canActivate(): boolean {
		if (!this.token.isAuthenticated()) {
			this.router.navigate(['login']);
			return false;
		}
		return true;
	}

}
