import { NgModule } from '@angular/core';
import { HeaderComponent } from '@components/header/header.component';
import { InputScanCodeComponent } from '@components/input-scan-code/input-scan-code.component';
import { ModalScanComponent } from '@components/modal-scan/modal-scan.component';
import { ModalComponent } from '@components/modal/modal.component';
import { SideNavbarComponent } from '@components/side-navbar/side-navbar.component';
import { TableComponent } from '@components/table/table.component';
import { ModalStationComponent } from '@pages/station/modal-station/modal-station.component';
import { ModalUserComponent } from '@pages/user/modal-user/modal-user.component';
import { SharedModule } from './shared.module';

@NgModule({
	declarations: [
		SideNavbarComponent,
		HeaderComponent,
		ModalUserComponent,
		ModalStationComponent,
		ModalComponent,
		TableComponent,
		InputScanCodeComponent,
		ModalScanComponent,
	],
	exports: [
		SideNavbarComponent,
		HeaderComponent,
		ModalUserComponent,
		SharedModule,
		ModalStationComponent,
		ModalComponent,
		TableComponent,
		InputScanCodeComponent,
		ModalScanComponent,
	],
	imports: [SharedModule],
})
export class ComponentModule {}
