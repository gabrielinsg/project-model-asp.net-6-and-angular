import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BarcodeFormat } from '@zxing/library';

@Component({
	selector: 'app-modal-scan',
	templateUrl: './modal-scan.component.html',
})
export class ModalScanComponent {
	@Input() title: string = '';
	@Output() eventEmitterScanCode = new EventEmitter<string>();

	readonly formats: BarcodeFormat[] = [BarcodeFormat.CODE_128];

	onScanSuccess(event: string): void {
		this.eventEmitterScanCode.emit(event);
	}
}
