import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css'],
})
export class ConfirmComponent implements OnInit {
  country: string = '';
  loader = false;
  constructor(
    public dialogRef: MatDialogRef<ConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private api: ApiService,
    private toast: ToastrService
  ) {
    this.country = data.name;
    console.log(data);
  }

  ngOnInit(): void {}
  onConfirm(): void {
    // Close the dialog, return true

    this.loader = true;
    this.api
      .updateData({
        id: this.data.id,
        name: this.country,
        active: true,
      })
      .subscribe({
        next: (res) => {
          console.log(res);
          this.toast.success('successfully updated');
          this.dialogRef.close(true);
          this.loader = false;
        },
        error: (err) => {
          console.error(err);
          this.toast.error(err.message);
          this.loader = false;
        },
      });
  }

  onDismiss(): void {
    // Close the dialog, return false
    this.dialogRef.close(false);
  }
}
