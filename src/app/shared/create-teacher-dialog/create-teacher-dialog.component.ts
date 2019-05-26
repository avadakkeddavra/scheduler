import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Teacher} from '../../core/models/teacher';

@Component({
  selector: 'app-create-teacher-dialog',
  templateUrl: './create-teacher-dialog.component.html',
  styleUrls: ['./create-teacher-dialog.component.scss']
})
export class CreateTeacherDialogComponent {
  Teacher: Teacher = {
    name: '',
    cafedra_id: null,
    position: '',
    token: null
  };
  constructor(public dialogRef: MatDialogRef<CreateTeacherDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    if (data.type === 'edit') {
      this.Teacher = data.teacher;
    }
  }

  onNoClick() {
    this.dialogRef.close();
  }
  isDisabled() {
    return !(this.Teacher.name.length > 0 && this.Teacher.cafedra_id !== null);
  }
}
