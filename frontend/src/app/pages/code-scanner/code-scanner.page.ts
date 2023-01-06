import { Component } from '@angular/core';
import { BarcodeFormat } from '@zxing/library';
import Swal from 'sweetalert2';

@Component({
	templateUrl: './code-scanner.page.html',
})
export class CodeScannerPage {
	scanCode!: string;
}
