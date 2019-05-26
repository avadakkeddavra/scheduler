import {Component, Inject} from '@angular/core';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
export const MY_FORMATS = {
  parse: {
    dateInput: 'DD-MM-YY',
  },
  display: {
    dateInput: 'DD-MM-YY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@Component({
  selector: 'app-create-event-dialog',
  templateUrl: './create-event-dialog.component.html',
  styleUrls: ['./create-event-dialog.component.scss'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class CreateEventDialogComponent {
  times: {name: string, id: number}[];
  useCustom = false;
  event = {
    date: '',
    start: {
      hours: 0,
      minutes: 0
    },
    end: {
      hours: 0,
      minutes: 0
    },
    title: ''
  }
  disabled = true;
  constructor(public dialogRef: MatDialogRef<CreateEventDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.times = this.data.times;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  onTimeChanged(type: 'start' | 'end') {
    const value = this.event[type];
    if (type === 'start') {
      if (value.hours > this.event.end.hours) {
        this.disabled = true;
      } else {
        this.disabled = false;
      }
    } else {
      if (value.hours < this.event.start.hours) {
        this.disabled = true;
      } else {
        this.disabled = false;
      }
    }
  }
}
