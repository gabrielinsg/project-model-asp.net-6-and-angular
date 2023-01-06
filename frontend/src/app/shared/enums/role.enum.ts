export enum ERole {
	ADMINISTRATOR = 'ADMINISTRATOR',
	ENGINEER = 'ENGINEER',
	OPERATOR = 'OPERATOR',
}

export type TRole = 'ADMINISTRATOR' | 'ENGINEER' | 'OPERATOR';

export function toERole(value: TRole): ERole {
	switch (value) {
		case 'ADMINISTRATOR':
			return ERole.ADMINISTRATOR;
		case 'ENGINEER':
			return ERole.ENGINEER;
		case 'OPERATOR':
			return ERole.OPERATOR;
	}
}
