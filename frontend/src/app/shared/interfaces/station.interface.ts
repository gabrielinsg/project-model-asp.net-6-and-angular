import { AbstractControl, FormGroup } from '@angular/forms';

export interface IStation {
	id: number;
	name: string;
}

export interface IStationFormGroup extends FormGroup {
	value: IStation;
	controls: {
		id: AbstractControl;
		name: AbstractControl;
	};
}
