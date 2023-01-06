import { Pipe, PipeTransform } from '@angular/core';
import { ERole } from '@enums/role.enum';
import { TranslateService } from '@ngx-translate/core';
import { BooleanPipe } from './boolean.pipe';
import { RolePipe } from './role.pipe';

@Pipe({
	name: 'genericPipe',
	pure: true,
})
export class GenericPipe implements PipeTransform {
	constructor(private readonly role: RolePipe, private readonly booleanPipe: BooleanPipe) {}

	transform(value: string, pipe: string): string {
		switch (pipe) {
			case 'role':
				return this.role.transform(value as unknown as ERole);
			case 'active':
				return this.booleanPipe.transform(value as unknown as boolean);
			default:
				return value;
		}
	}
}
