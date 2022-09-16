import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../service/api.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmComponent } from '../dialogs/confirm/confirm.component';
import { ConfirmdeleteComponent } from '../dialogs/confirmdelete/confirmdelete.component';

@Component({
  selector: 'app-webapi',
  templateUrl: './webapi.component.html',
  styleUrls: ['./webapi.component.css'],
})
export class WebapiComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'active', 'action'];
  dataSource!: MatTableDataSource<any>;
  loader = true;

  constructor(
    private api: ApiService,
    private toast: ToastrService,
    private dialog: MatDialog
  ) {}
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.api.getCountryData().subscribe({
      next: (res: any) => {
        this.loader = true;
        console.log(res);
        const data = res.sort((a: any, b: any) => a.id - b.id);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.loader = false;
      },
      error: (err) => {
        console.error(err);
        this.loader = false;
      },
    });
  }

  countryInp(value: string) {
    if (value) {
      this.loader = true;
      console.log(value);

      this.api
        .insertData({
          name: value,
          active: true,
        })
        .subscribe({
          next: (res) => {
            this.toast.success(`${value} successfully Added`);
            console.log(res);
            this.getData();
            this.loader = false;
          },
          error: (err) => {
            this.loader = false;
            this.toast.error(...err.error.errors.Name);
            console.log(...err.error.errors.Name);
          },
        });
    } else {
      alert('please enter value');
    }
  }

  deleteCountry(row: any) {
    const box = this.dialog.open(ConfirmdeleteComponent, {
      width: '50%',
      // height: '30%',
      data: row,
    });

    box.afterClosed().subscribe((result) => {
      console.log(result);
      if (result) {
        this.loader = true;
        this.api
          .delete({
            id: row.id,
          })
          .subscribe({
            next: (res) => {
              console.log(res);
              this.toast.success('deleted successfully');
              this.getData();
              this.loader = false;
            },
            error: (err) => {
              console.error(err);
              this.loader = false;
              this.toast.error(err.message);
            },
          });
      }
    });

    // const delConfirm = confirm(`delete ${row.name}`);

    // if (delConfirm) {
    //   this.loader = true;
    //   this.api
    //     .delete({
    //       id: row.id,
    //     })
    //     .subscribe({
    //       next: (res) => {
    //         console.log(res);
    //         this.toast.success('deleted successfully');
    //         this.getData();
    //         this.loader = false;
    //       },
    //       error: (err) => {
    //         console.error(err);
    //         this.loader = false;
    //         this.toast.error(err.message);
    //       },
    //     });
    // }
  }

  updateData(data: any) {
    const box = this.dialog.open(ConfirmComponent, {
      minWidth: '40%',
      // height: '30%',
      data,
    });
    box.afterClosed().subscribe((result) => {
      console.log(result);
      if (result) {
        this.getData();
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
