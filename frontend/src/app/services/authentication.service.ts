import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { toERole, TRole } from '@enums/role.enum';
import { ICredential, initCredential } from '@interfaces/credential.interface';
import { ILogin } from '@interfaces/login.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SwalService } from './swal.service';

@Injectable({
	providedIn: 'root',
})
export class AuthenticationService {
	private readonly endpoint: string = `${environment.urlApi}/users`;
	private currentUserSubject: BehaviorSubject<ICredential>;
	currentUser: Observable<ICredential>;

	constructor(private readonly http: HttpClient, private readonly router: Router, private readonly swal: SwalService) {
		this.currentUserSubject = new BehaviorSubject<ICredential>(JSON.parse(sessionStorage.getItem('currentUser')!));
		this.currentUser = this.currentUserSubject.asObservable();
	}

	get currentUserValue(): ICredential {
		return this.currentUserSubject.value;
	}

	login(request: ILogin): void {
		this.http.post<ICredential>(`${this.endpoint}/authenticate`, request).subscribe({
			next: async (request: ICredential) => {
				if (!request) {
					this.swal.failure('swal.user-or-password-invalid');
					sessionStorage.removeItem('currentUser');
					this.router.navigateByUrl('login');
					return;
				}

				request.role = toERole(request.role as unknown as TRole);

				sessionStorage.setItem('currentUser', JSON.stringify(request));
				this.currentUserSubject.next(request);
				this.router.navigateByUrl('home');
			},
			error: (error: HttpErrorResponse) => {
				this.swal.failure('swal.unauthorized', '', error.error.message);
				this.router.navigateByUrl('login');
			},
		});
	}

	logout(): void {
		sessionStorage.removeItem('currentUser');
		this.currentUserSubject.next(initCredential());
	}
}
