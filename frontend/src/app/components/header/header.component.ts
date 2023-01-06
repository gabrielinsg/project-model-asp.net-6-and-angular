import { Component } from '@angular/core';
import { ActivationStart, NavigationEnd, Router } from '@angular/router';
import { filter, startWith } from 'rxjs/operators';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
	componentTitle: string = '';

	constructor(private readonly router: Router) {
		this.router.events.subscribe((data) => {
			if (data instanceof ActivationStart) {
				this.componentTitle = data.snapshot.data['title'];
			}
		});

		this.router.events.pipe(
			filter((event) => event instanceof NavigationEnd),
			startWith(this.router),
		);
	}
}
