import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'app-confirmdelete',
  templateUrl: './confirmdelete.component.html',
  styleUrls: ['./confirmdelete.component.css'],
})
export class ConfirmdeleteComponent implements OnInit {
  country = '';
  constructor(
    public dialogRef: MatDialogRef<ConfirmdeleteComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.country = data.name;
  }

  ngOnInit(): void {}

  onConfirm(): void {
    // Close the dialog, return true

    this.dialogRef.close(true);
  }

  onDismiss(): void {
    // Close the dialog, return false
    this.dialogRef.close(false);
  }
}
