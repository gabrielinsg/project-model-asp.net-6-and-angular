import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
	templateUrl: './configuration.page.html',
})
export class ConfigurationPage {
	language: string;
	darkMode: boolean;

	constructor(private readonly translate: TranslateService) {
		this.language = this.translate.currentLang;
		this.darkMode = document.body.classList[1] === 'theme-alternate';
	}

	changeLanguage(): void {
		this.translate.use(this.language);
		localStorage.setItem('language', this.language);
		window.location.reload();
	}

	changeTheme(): void {
		this.darkMode = !this.darkMode;
		this.darkMode ? localStorage.setItem('theme', 'dark') : localStorage.setItem('theme', 'light');
		document.body.classList.toggle('theme-alternate');
	}
}
