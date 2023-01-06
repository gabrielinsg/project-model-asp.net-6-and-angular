import { Component, OnInit } from '@angular/core';
import { ERole } from '@enums/role.enum';
import { IMenu } from '@interfaces/menu.interface';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from '@services/authentication.service';
import { firstValueFrom } from 'rxjs';

@Component({
	selector: 'app-side-navbar',
	templateUrl: './side-navbar.component.html',
	styleUrls: ['./side-navbar.component.scss'],
})
export class SideNavbarComponent implements OnInit {
	menuList: IMenu[] = [];

	constructor(private readonly authenticationService: AuthenticationService, private readonly translate: TranslateService) {}

	async ngOnInit(): Promise<void> {
		this.menuList = [
			{
				text: await firstValueFrom(this.translate.get('side-menu.home')),
				icon: 'home',
				routerLink: '/home',
				role: [ERole.ADMINISTRATOR, ERole.ENGINEER, ERole.OPERATOR],
			},
			{
				text: await firstValueFrom(this.translate.get('side-menu.user')),
				icon: 'people',
				routerLink: '/user',
			},
			{
				text: await firstValueFrom(this.translate.get('side-menu.code-scanner')),
				icon: 'qr_code_scanner',
				routerLink: '/code-scanner',
			},
			{
				text: await firstValueFrom(this.translate.get('side-menu.station')),
				icon: 'precision_manufacturing',
				routerLink: '/station',
			},
			{
				text: await firstValueFrom(this.translate.get('side-menu.chart')),
				icon: 'show_chart',
				routerLink: '/chart',
			},
			{
				text: await firstValueFrom(this.translate.get('side-menu.configuration')),
				icon: 'settings',
				routerLink: '/configuration',
			},
			{
				text: await firstValueFrom(this.translate.get('side-menu.logout')),
				icon: 'logout',
				routerLink: '/login',
			},
		];

		const role: ERole | null = this.authenticationService.currentUserValue?.role ? this.authenticationService.currentUserValue?.role : null;

		if (role) {
			this.menuList = this.menuList.filter((x) => !x.role || x.role?.includes(role));
			this.menuList.forEach((x) => (x.children = x.children?.filter((y) => !y.role || y.role?.includes(role))));
			this.menuList = this.menuList.filter((x) => !x.children || x.children?.length != 0);
		}
	}
}
