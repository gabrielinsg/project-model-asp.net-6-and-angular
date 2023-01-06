import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { ICredential } from '@interfaces/credential.interface';
import { AuthenticationService } from '@services/authentication.service';
import { SwalService } from '@services/swal.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
	constructor(private readonly router: Router, private readonly authenticationService: AuthenticationService, private readonly swal: SwalService) {}

	canActivate(route: ActivatedRouteSnapshot): boolean {
		const credential: ICredential = this.authenticationService.currentUserValue;

		/* Verifica se o usuário está autenticado. */
		if (!credential) {
			this.swal.failureConfirm('swal.authentication-failure');
			this.router.navigateByUrl('/login');
			return false;
		}

		/* Verifica se a sessão do usuário está expirado */
		/*
		if (new Date() > new Date(credential.expiresToken)) {
			this.swal.failureConfirm('swal.session-expired');
			this.router.navigateByUrl('/login');
			return false;
		}
		*/

		/* Verifica se o usuário está autorizado. */
		if (route.data['roles'] && !route.data['roles'].includes(credential.role)) {
			this.swal.failureConfirm('swal.unauthorized');
			this.router.navigateByUrl('/home');
		}

		return true;
	}
}
