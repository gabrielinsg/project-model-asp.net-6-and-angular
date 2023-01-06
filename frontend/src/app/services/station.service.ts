import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IStation } from '@interfaces/station.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root',
})
export class StationService {
	private readonly endpoint: string = `${environment.urlApi}/station`;

	constructor(private readonly http: HttpClient) {}

	getAll(): Observable<any[]> {
		return this.http.get<any[]>(`${this.endpoint}`);
	}

	postAdd(request: IStation): Observable<void> {
		return this.http.post<void>(`${this.endpoint}`, request);
	}

	delete(id: number): Observable<void> {
		return this.http.delete<void>(`${this.endpoint}/${id}`);
	}
}
