import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
	name: 'booleanPipe',
	pure: true,
})
export class BooleanPipe implements PipeTransform {
	constructor(private readonly translate: TranslateService) {}

	transform(value: boolean): string {
		switch (value) {
			case true:
				return this.translate.instant('text.yes');
			case false:
				return this.translate.instant('text.no');
		}
	}
}
