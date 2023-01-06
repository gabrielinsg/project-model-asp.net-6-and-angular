import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { IStationFormGroup } from '@interfaces/station.interface';
import { StationService } from '@services/station.service';
import { SwalService } from '@services/swal.service';

@Component({
	templateUrl: './modal-station.component.html',
})
export class ModalStationComponent {
	formStation: IStationFormGroup;

	constructor(
		private readonly stationService: StationService,
		private readonly formBuilder: FormBuilder,
		private readonly swal: SwalService,
		public readonly dialogRef: MatDialogRef<any>,
	) {
		this.formStation = this.formBuilder.group({
			name: ['', Validators.required],
		}) as IStationFormGroup;
	}

	onSubmit(): void {
		this.stationService.postAdd(this.formStation.value).subscribe({
			next: () => {
				this.swal.success();
				this.dialogRef.close();
			},
			error: (error: HttpErrorResponse) => {
				this.swal.failureConfirm(error.error);
				console.error(error);
			},
		});
	}
}
