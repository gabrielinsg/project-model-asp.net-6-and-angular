import { ERole } from '@enums/role.enum';

export interface IMenu {
	children?: IMenuItem[];
	icon?: string;
	role?: ERole[];
	routerLink?: string;
	text: string;
}

export interface IMenuItem {
	icon?: string;
	role?: ERole[];
	routerLink: string;
	text: string;
}
