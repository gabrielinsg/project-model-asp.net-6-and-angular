import { AbstractControl, FormGroup } from '@angular/forms';
import { ERole } from '@enums/role.enum';

export interface IUser {
	id: number;
	firstName: string;
	lastName: string;
	username: string;
	role: ERole;
	active?: boolean;
	passwordHash: string;
	confirmPasswordHash?: string;
}

export interface IUserFormGroup extends FormGroup {
	value: IUser;
	controls: {
		id: AbstractControl;
		firstName: AbstractControl;
		lastName: AbstractControl;
		username: AbstractControl;
		role: AbstractControl;
		active?: AbstractControl;
		passwordHash: AbstractControl;
		confirmPasswordHash?: AbstractControl;
	};
}
