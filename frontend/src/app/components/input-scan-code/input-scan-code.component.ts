import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalScanComponent } from '@components/modal-scan/modal-scan.component';

@Component({
	selector: 'app-input-scan-code',
	templateUrl: './input-scan-code.component.html',
})
export class InputScanCodeComponent {
	@Input() scanCode!: string;
	@Input() title!: string;
	@Output() scanCodeChange: EventEmitter<string> = new EventEmitter<string>();

	constructor(private readonly matDialog: MatDialog) {}

	onReadScan(): void {
		const modal = this.matDialog.open(ModalScanComponent);
		modal.componentInstance.title = this.title;
		modal.componentInstance.eventEmitterScanCode.subscribe((scanCode) => {
			this.scanCode = scanCode;
			this.scanCodeChange.emit(scanCode);
		});
	}
}
