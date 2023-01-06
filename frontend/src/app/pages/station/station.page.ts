import { Component } from '@angular/core';
import { StationService } from '@services/station.service';

@Component({
	templateUrl: './station.page.html',
})
export class StationPage {
	readonly displayedColumns: string[] = ['id', 'name', 'action'];
	readonly actions: string[] = ['edit', 'delete'];

	constructor(readonly stationService: StationService) {}
}
