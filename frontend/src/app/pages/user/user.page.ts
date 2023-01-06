import { Component } from '@angular/core';
import { UserService } from '@services/user.service';

@Component({
	templateUrl: './user.page.html',
})
export class UserPage {
	readonly displayedColumns: string[] = ['id', 'firstName', 'lastName', 'username', 'role', 'active'];

	constructor(readonly userService: UserService) {}
}
