import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { IUser, IUserFormGroup } from '@interfaces/user.interface';
import { SwalService } from '@services/swal.service';
import { UserService } from '@services/user.service';
import { CompareValidator } from 'src/app/shared/functions/compare-validator.function';

@Component({
	templateUrl: './modal-user.component.html',
})
export class ModalUserComponent {
	formUser: IUserFormGroup;

	constructor(
		private readonly userService: UserService,
		private readonly formBuilder: FormBuilder,
		private readonly swal: SwalService,
		public readonly dialogRef: MatDialogRef<any>,
	) {
		this.formUser = this.formBuilder.group(
			{
				firstName: ['', Validators.required],
				lastName: ['', Validators.required],
				username: ['', Validators.required],
				role: ['', Validators.required],
				active: [true, Validators.required],
				passwordHash: ['', Validators.required],
				confirmPasswordHash: ['', Validators.required],
			},
			{
				validator: CompareValidator('passwordHash', 'confirmPasswordHash'),
			},
		) as IUserFormGroup;
	}

	onSubmit(): void {
		this.userService.postAdd(this.formUser.value).subscribe({
			next: () => {
				this.swal.success();
				this.dialogRef.close();
			},
			error: (error: HttpErrorResponse) => {
				this.swal.failure();
				console.error(error);
			},
		});
	}
}
