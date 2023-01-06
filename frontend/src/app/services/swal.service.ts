import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';
import Swal, { SweetAlertOptions, SweetAlertResult } from 'sweetalert2';

@Injectable({
	providedIn: 'root',
})
export class SwalService {
	constructor(private readonly translate: TranslateService) {}

	private async defaultSwalModalSetting(): Promise<SweetAlertOptions> {
		return {
			title: await firstValueFrom(this.translate.get('swal.default')),
			showCancelButton: true,
			showConfirmButton: true,
			cancelButtonText: await firstValueFrom(this.translate.get('swal.no')),
			confirmButtonText: await firstValueFrom(this.translate.get('swal.yes')),
			confirmButtonColor: '#28A745',
			cancelButtonColor: '#FF5B57',
			reverseButtons: true,
			icon: 'question',
		};
	}

	async add(text?: string): Promise<SweetAlertResult<any>> {
		return Swal.fire({
			...(await this.defaultSwalModalSetting()),
			title: await firstValueFrom(this.translate.get('swal.add')),
			text: text ? await firstValueFrom(this.translate.get(text)) : '',
		});
	}

	async edit(text?: string): Promise<SweetAlertResult<any>> {
		return Swal.fire({
			...(await this.defaultSwalModalSetting()),
			title: await firstValueFrom(this.translate.get('swal.edit')),
			text: text ? await firstValueFrom(this.translate.get(text)) : '',
		});
	}

	async delete(text?: string): Promise<SweetAlertResult<any>> {
		return Swal.fire({
			...(await this.defaultSwalModalSetting()),
			title: await firstValueFrom(this.translate.get('swal.delete')),
			text: text ? await firstValueFrom(this.translate.get(text)) : '',
		});
	}

	private defaultSwalPopUpSetting(): SweetAlertOptions {
		return {
			position: 'top-end',
			showConfirmButton: false,
			backdrop: false,
		};
	}

	private defaultSwalPopUpTimerSetting(): SweetAlertOptions {
		return {
			timer: 3000,
			...this.defaultSwalPopUpSetting(),
		};
	}

	async success(text?: string): Promise<void> {
		Swal.fire({
			...this.defaultSwalPopUpTimerSetting(),
			icon: 'success',
			title: await firstValueFrom(this.translate.get('swal.success')),
			text: text ? await firstValueFrom(this.translate.get(text)) : '',
		});
	}

	async failure(title: string = 'swal.failure', text?: string, customMessage?: string): Promise<void> {
		if (customMessage) {
			if (text) {
				text = (await firstValueFrom(this.translate.get(text))) + '. ' + customMessage + '.';
			} else {
				text = customMessage;
			}
		}

		Swal.fire({
			...this.defaultSwalPopUpTimerSetting(),
			icon: 'error',
			text: text,
			title: await firstValueFrom(this.translate.get(title)),
		});
	}

	async failureConfirm(customMessage?: string): Promise<void>;
	async failureConfirm(title: string = 'swal.failure', text?: string, customMessage?: string): Promise<void> {
		if (customMessage) {
			if (text) {
				text = (await firstValueFrom(this.translate.get(text))) + '. ' + customMessage + '.';
			} else {
				text = customMessage;
			}
		}

		Swal.fire({
			...this.defaultSwalPopUpSetting(),
			icon: 'error',
			title: await firstValueFrom(this.translate.get(title)),
			text: text,
			showConfirmButton: true,
			confirmButtonText: await firstValueFrom(this.translate.get('swal.ok')),
			confirmButtonColor: '#28A745',
		});
	}
}
