import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@auth/auth.guard';
import { ERole } from '@enums/role.enum';
import { ChartPage } from '@pages/chart/chart.page';
import { CodeScannerPage } from '@pages/code-scanner/code-scanner.page';
import { ConfigurationPage } from '@pages/configuration/configuration.page';
import { ErrorPage } from '@pages/error/error.page';
import { HomePage } from '@pages/home/home.page';
import { LoginPage } from '@pages/login/login.page';
import { StationPage } from '@pages/station/station.page';
import { UserPage } from '@pages/user/user.page';

const routes: Routes = [
	{ path: 'home', component: HomePage, canActivate: [AuthGuard], data: { roles: [ERole.ADMINISTRATOR, ERole.ENGINEER, ERole.OPERATOR] } },
	{ path: 'user', component: UserPage, canActivate: [AuthGuard] },
	{ path: 'configuration', component: ConfigurationPage, canActivate: [AuthGuard] },
	{ path: 'station', component: StationPage, canActivate: [AuthGuard] },
	{ path: 'chart', component: ChartPage, canActivate: [AuthGuard] },
	{ path: 'code-scanner', component: CodeScannerPage, canActivate: [AuthGuard] },
	{ path: 'error', component: ErrorPage, canActivate: [AuthGuard] },
	{ path: 'login', component: LoginPage },
	{ path: '', pathMatch: 'full', redirectTo: 'login' },
	{ path: '**', redirectTo: 'error' },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
