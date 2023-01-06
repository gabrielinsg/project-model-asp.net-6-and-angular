import { CommonModule } from '@angular/common';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { NgChartsModule } from 'ng2-charts';
import { MaterialDesignModule } from './material-design.module';
import { PipeModule } from './pipe.module';

@NgModule({
	imports: [
		CommonModule,
		FlexLayoutModule,
		FormsModule,
		HttpClientJsonpModule,
		HttpClientModule,
		MaterialDesignModule,
		ReactiveFormsModule,
		RouterModule,
		TranslateModule,
		ZXingScannerModule,
		PipeModule,
		NgChartsModule,
	],
	exports: [
		CommonModule,
		FlexLayoutModule,
		FormsModule,
		HttpClientJsonpModule,
		HttpClientModule,
		MaterialDesignModule,
		ReactiveFormsModule,
		RouterModule,
		TranslateModule,
		ZXingScannerModule,
		PipeModule,
		NgChartsModule,
	],
})
export class SharedModule {}
