import { ComponentType } from '@angular/cdk/portal';
import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ModalStationComponent } from '@pages/station/modal-station/modal-station.component';
import { ModalUserComponent } from '@pages/user/modal-user/modal-user.component';
import { SwalService } from '@services/swal.service';

@Component({
	selector: 'app-table',
	templateUrl: './table.component.html',
})
export class TableComponent<T> implements OnInit {
	@Input() title!: string;
	@Input() modal!: string;
	@Input() displayedColumns!: string[];
	@Input() actions: string[] = [];
	@Input() service!: any;

	@ViewChild(MatPaginator) paginator!: MatPaginator;
	@ViewChild(MatSort) sort!: MatSort;

	dataSource: MatTableDataSource<T> = new MatTableDataSource<T>();

	constructor(private readonly dialog: MatDialog, private readonly changeDetectorRefs: ChangeDetectorRef, private readonly swal: SwalService) {}

	ngOnInit(): void {
		this.refresh();
	}

	private refresh(): void {
		this.service.getAll().subscribe((response: any) => {
			this.dataSource.data = response;
			this.dataSource.paginator = this.paginator;
			this.dataSource.sort = this.sort;
			this.changeDetectorRefs.detectChanges();
		});
	}

	applyFilter(event: Event): void {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();
		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}

	openModal(): void {
		const component: ComponentType<void> = {
			ModalUserComponent: ModalUserComponent,
			ModalStationComponent: ModalStationComponent,
		}[this.modal] as ComponentType<void>;

		this.dialog
			.open(component, {
				width: '70%',
			})
			.afterClosed()
			.subscribe(() => {
				this.refresh();
			});
	}

	onDelete(id: number): void {
		this.swal.delete().then((reseult) => {
			if (reseult.dismiss) {
				return;
			}
			this.service.delete(id).subscribe({
				next: () => {
					this.swal.success();
					this.refresh();
				},
				error: (error: HttpErrorResponse) => {
					this.swal.failureConfirm(error.error);
					console.error(error);
				},
			});
		});
	}
}
