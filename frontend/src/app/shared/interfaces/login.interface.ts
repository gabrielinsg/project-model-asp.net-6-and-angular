import { AbstractControl, FormGroup } from '@angular/forms';

export interface ILogin {
	username: string;
	password: string;
}

export interface ILoginFormGroup extends FormGroup {
	value: ILogin;
	controls: {
		username: AbstractControl;
		password: AbstractControl;
	};
}
