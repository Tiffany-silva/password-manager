import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

const baseUrl = 'http://localhost:8080/api/entry';

@Injectable({
	providedIn: 'root'
})
export class PasswordEntryService {

	constructor(private http: HttpClient) {
	}

	getAllEntriesOfUser(id: any): Observable<any> {
		console.log(this.http.get(baseUrl));
		return this.http.get(`${baseUrl}/findAllEntriesOfUser/${id}`, {responseType: 'json'});
	}

	createEntry(data: any): Observable<any> {
		return this.http.post(baseUrl, data);
	}

	deleteEntry(id: any): Observable<any> {
		return this.http.delete(`${baseUrl}/${id}`);
	}
}
