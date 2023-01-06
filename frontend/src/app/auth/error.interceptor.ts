import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from '@services/authentication.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
	constructor(private authenticationService: AuthenticationService) {}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return next.handle(request).pipe(
			catchError((error: HttpErrorResponse) => {
				console.error(error);

				if (error.status === 401) {
					this.authenticationService.logout();
				}

				return throwError(() => error);
			}),
		);
	}
}
