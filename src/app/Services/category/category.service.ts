import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

const baseUrl = 'http://localhost:8080/api/category';

@Injectable({
	providedIn: 'root'
})
export class CategoryService {

	constructor(private http: HttpClient) {
	}

	getAllCategory(): Observable<any> {
		return this.http.get(baseUrl + '/findAllCategories', {responseType: 'json'});
	}

	createCategory(data: any): Observable<any> {
		return this.http.post(baseUrl, data);
	}

}
