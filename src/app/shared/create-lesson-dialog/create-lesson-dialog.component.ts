import {Component, Inject, OnInit} from '@angular/core';
import {Teacher} from '../../core/models/teacher';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Lesson} from '../../core/models/lesson';

@Component({
  selector: 'app-create-lesson-dialog',
  templateUrl: './create-lesson-dialog.component.html',
  styleUrls: ['./create-lesson-dialog.component.scss']
})
export class CreateLessonDialogComponent {

  Lesson: Lesson = {
    name: '',
    cafedra_id: null,
    teacher_id: null
  };
  constructor(public dialogRef: MatDialogRef<CreateLessonDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(data);
    if (data.type === 'edit') {
      this.Lesson = data.lesson;
    }
  }

  onNoClick() {
    this.dialogRef.close();
  }
  isDisabled() {
    return !(this.Lesson.name.length > 0 && this.Lesson.cafedra_id !== null && this.Lesson.teacher_id !== null);
  }

}
