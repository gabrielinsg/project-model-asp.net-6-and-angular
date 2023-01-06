import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ILoginFormGroup } from '@interfaces/login.interface';
import { AuthenticationService } from '@services/authentication.service';

@Component({
	templateUrl: './login.page.html',
	selector: 'app-login-page',
})
export class LoginPage {
	formLogin: ILoginFormGroup;

	constructor(private readonly authenticationService: AuthenticationService, private readonly formBuilder: FormBuilder) {
		this.authenticationService.logout();
		this.formLogin = this.formBuilder.group({
			username: ['', Validators.required],
			password: ['', Validators.required],
		}) as ILoginFormGroup;
	}

	onSubmit(): void {
		this.authenticationService.login(this.formLogin.value);
	}
}
