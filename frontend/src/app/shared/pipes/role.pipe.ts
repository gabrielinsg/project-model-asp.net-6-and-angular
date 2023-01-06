import { Pipe, PipeTransform } from '@angular/core';
import { ERole } from '@enums/role.enum';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
	name: 'rolePipe',
	pure: true,
})
export class RolePipe implements PipeTransform {
	constructor(private readonly translate: TranslateService) {}

	transform(value: ERole): string {
		switch (value) {
			case ERole.ADMINISTRATOR:
				return this.translate.instant('text.administrator');
			case ERole.ENGINEER:
				return this.translate.instant('text.engineer');
			case ERole.OPERATOR:
				return this.translate.instant('text.operator');
			default:
				console.error(`[ ERROR ] - Não é possível localizar role: ${value}`);
				return '';
		}
	}
}
