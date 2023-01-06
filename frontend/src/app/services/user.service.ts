import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICredential } from '@interfaces/credential.interface';
import { IUser } from '@interfaces/user.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root',
})
export class UserService {
	private readonly endpoint: string = `${environment.urlApi}/users`;

	constructor(private readonly http: HttpClient) {}

	getAll(): Observable<ICredential[]> {
		return this.http.get<ICredential[]>(`${this.endpoint}/getAll`);
	}

	postAdd(request: IUser): Observable<void> {
		return this.http.post<void>(`${this.endpoint}/Save`, request);
	}
}
