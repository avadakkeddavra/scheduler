import {Component, Inject, OnInit} from '@angular/core';
import {Group} from '../../core/models/group';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Cafedra} from '../../core/models/cafedra';

@Component({
  selector: 'app-create-cafedra-dialog',
  templateUrl: './create-cafedra-dialog.component.html',
  styleUrls: ['./create-cafedra-dialog.component.scss']
})
export class CreateCafedraDialogComponent {
  cafedra: Cafedra = {
    name: ''
  };
  type =  'create';
  constructor(public dialogRef: MatDialogRef<CreateCafedraDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    if (data && data.type === 'edit') {
      this.type = 'edit';
      this.cafedra = data.cafedra;
    }
  }

  onNoClick() {
    this.dialogRef.close();
  }
}
