import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopbarComponent } from './topbar/topbar.component';
import {MaterialModule} from './material/material.module';
import { CreateEventDialogComponent } from './create-event-dialog/create-event-dialog.component';
import {FormsModule} from '@angular/forms';
import {MatDatepickerModule, MatNativeDateModule} from '@angular/material';
import {RouterModule} from '@angular/router';
import { CreateGroupDialogComponent } from './create-group-dialog/create-group-dialog.component';
import { CreateTeacherDialogComponent } from './create-teacher-dialog/create-teacher-dialog.component';
import { CreateCafedraDialogComponent } from './create-cafedra-dialog/create-cafedra-dialog.component';
import { CreateLessonDialogComponent } from './create-lesson-dialog/create-lesson-dialog.component';
import { ShowEventComponent } from './show-event/show-event.component';

@NgModule({
  declarations: [
    TopbarComponent,
    CreateEventDialogComponent,
    CreateGroupDialogComponent,
    CreateTeacherDialogComponent,
    CreateCafedraDialogComponent,
    CreateLessonDialogComponent,
    ShowEventComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    RouterModule
  ],
  exports: [
    MaterialModule,
    TopbarComponent,
    CreateEventDialogComponent,
    CreateGroupDialogComponent,
    CreateCafedraDialogComponent,
    MatNativeDateModule
  ],
  bootstrap: [
    CreateGroupDialogComponent,
    CreateEventDialogComponent,
    CreateTeacherDialogComponent,
    CreateCafedraDialogComponent,
    CreateLessonDialogComponent,
    ShowEventComponent
  ]
})
export class SharedModule { }
