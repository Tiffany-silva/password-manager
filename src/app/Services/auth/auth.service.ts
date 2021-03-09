import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

const AUTH_API = 'http://localhost:8080/api/auth/';

const httpOptions = {
	headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
};

@Injectable({
	providedIn: 'root'
})

export class AuthService {
	constructor(private http: HttpClient) {
	}

	login(credentials: { email: any; password: any }): Observable<any> {
		return this.http.post(AUTH_API + 'login', {
			email: credentials.email,
			password: credentials.password,
		}, httpOptions);
	}

	register(user: any): Observable<any> {
		console.log(user);

		return this.http.post(AUTH_API + 'register', {
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			username: user.username,
			password: user.password,
		}, httpOptions);
	}

	logout(id: any): Observable<any> {
		console.log('im hereeee');
		return this.http.post(AUTH_API + 'logout', id);
	}

	validateMasterPassword(id: any, password: any): Observable<any> {
		return this.http.post(AUTH_API + 'validateMasterPassword', {
			id: id,
			password: password,
		}, httpOptions);
	}
}
