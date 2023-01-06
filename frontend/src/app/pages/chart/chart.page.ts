import { Component, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';

@Component({
	templateUrl: './chart.page.html',
})
export class ChartPage {
	public lineChartData: ChartConfiguration['data'] = {
		datasets: [
			{
				data: [65, 59, 80, 81, 56, 55, 40],
				label: 'Series A',
			},
			{
				data: [28, 48, 40, 19, 86, 27, 90],
				label: 'Series B',
			},
			{
				data: [86, 27, 90, 28, 48, 81, 56],
				label: 'Series C',
			},
		],
		labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
	};
}
