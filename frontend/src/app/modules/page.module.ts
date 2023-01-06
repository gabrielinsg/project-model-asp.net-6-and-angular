import { NgModule } from '@angular/core';
import { ChartPage } from '@pages/chart/chart.page';
import { CodeScannerPage } from '@pages/code-scanner/code-scanner.page';
import { ConfigurationPage } from '@pages/configuration/configuration.page';
import { ErrorPage } from '@pages/error/error.page';
import { HomePage } from '@pages/home/home.page';
import { LoginPage } from '@pages/login/login.page';
import { StationPage } from '@pages/station/station.page';
import { UserPage } from '@pages/user/user.page';
import { ComponentModule } from './component.module';

@NgModule({
	declarations: [StationPage, CodeScannerPage, ConfigurationPage, ErrorPage, HomePage, LoginPage, UserPage, ChartPage],
	exports: [StationPage, CodeScannerPage, ConfigurationPage, ErrorPage, HomePage, LoginPage, UserPage, ChartPage, ComponentModule],
	imports: [ComponentModule],
})
export class PageModule {}
