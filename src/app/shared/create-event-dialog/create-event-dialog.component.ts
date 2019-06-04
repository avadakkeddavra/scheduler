import {Component, EventEmitter, Inject, Input, OnChanges, OnInit, Output} from '@angular/core';
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
  @Input() teachers;
  @Input() groups;
  @Input() days;
  @Input() lessons;
  @Input() times;
  @Input() classes;
  @Input() data;
  @Input() type;

  @Output() search = new EventEmitter();
  @Input() open = false;
  @Output() close = new EventEmitter();
  @Output() save = new EventEmitter();
  @Output() delete = new EventEmitter();
  @Output() update = new EventEmitter();

  @Input() Event;

  constructor() {}


  DisplayFn(array) {
    return (id: number) => {
      const value = array.find((item) => item.id === id);
      return value ? value.name : '';
    }
  }

  handleClick() {
    if(this.type === 'create') {
      this.save.emit(this.Event)
    } else {
      this.update.emit({id: this.Event.id, data: this.Event})
    }
  }

}
