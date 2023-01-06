import { NgModule } from '@angular/core';
import { BooleanPipe } from '@pipes/boolean.pipe';
import { GenericPipe } from '@pipes/generic.pipe';
import { RolePipe } from '@pipes/role.pipe';

@NgModule({
	declarations: [RolePipe, GenericPipe, BooleanPipe],
	exports: [RolePipe, GenericPipe, BooleanPipe],
	providers: [RolePipe, GenericPipe, BooleanPipe],
})
export class PipeModule {}
