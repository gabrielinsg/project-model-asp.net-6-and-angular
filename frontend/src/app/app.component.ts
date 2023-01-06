import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	mobileQuery!: MediaQueryList;

	constructor(readonly router: Router, private readonly translate: TranslateService) {
		const language: string = localStorage.getItem('language')!;
		if (language) {
			this.translate.use(language);
		} else {
			localStorage.setItem('language', 'pt-BR');
			this.translate.use('pt-BR');
		}

		localStorage.getItem('theme') === 'dark' ? document.body.classList.add('theme-alternate') : document.body.classList.remove('theme-alternate');
	}
}
