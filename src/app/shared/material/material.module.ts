import {MatToolbarModule} from '@angular/material/toolbar';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatCardModule, MatCheckboxModule,
  MatChipsModule, MatDatepickerModule, MatDialogModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule, MatPaginatorModule, MatSelectModule, MatSlideToggleModule, MatSnackBarModule, MatTableModule
} from '@angular/material';
import {MatMomentDateModule} from '@angular/material-moment-adapter';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatGridListModule,
    MatCardModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatTableModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatPaginatorModule
  ],
  exports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatGridListModule,
    MatCardModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatTableModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatPaginatorModule
  ]
})
export class MaterialModule { }
