import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Group} from '../../core/models/group';

@Component({
  selector: 'app-create-group-dialog',
  templateUrl: './create-group-dialog.component.html',
  styleUrls: ['./create-group-dialog.component.scss']
})
export class CreateGroupDialogComponent {
  group: Group = {
    name: '',
    cafedra_id: null
  };
  type =  'create';
  constructor(public dialogRef: MatDialogRef<CreateGroupDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    if (data.type === 'edit') {
      this.type = 'edit';
      this.group = data.group;
    }
  }

  onNoClick() {
    this.dialogRef.close();
  }
}
