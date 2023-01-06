import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
	selector: 'app-modal',
	templateUrl: './modal.component.html',
})
export class ModalComponent {
	@Input() title: string = '';
	@Input() isValid?: boolean = false;

	@Output() eventEmitterSubmit = new EventEmitter<void>();

	constructor() {}

	onSubmit(): void {
		this.eventEmitterSubmit.emit();
	}
}
