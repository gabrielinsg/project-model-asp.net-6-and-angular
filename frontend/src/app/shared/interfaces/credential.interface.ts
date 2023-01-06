import { ERole } from '@enums/role.enum';

export interface ICredential {
	id: number;
	firstName: string;
	lastName: string;
	username: string;
	password?: string;
	role?: ERole;
	token: string;
	active: boolean;
}

export function initCredential(): ICredential {
	return {
		id: 0,
		firstName: '',
		lastName: '',
		username: '',
		token: '',
		active: false,
	};
}
