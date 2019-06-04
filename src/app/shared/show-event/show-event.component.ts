import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import * as moment from "moment";

@Component({
  selector: 'app-show-event',
  templateUrl: './show-event.component.html',
  styleUrls: ['./show-event.component.scss']
})
export class ShowEventComponent {
  data;
  constructor(public dialogRef: MatDialogRef<ShowEventComponent>,
              @Inject(MAT_DIALOG_DATA) public event: any) {
    this.data = event.data;
  }

  getTimeDiff() {
    const start = moment(this.event.start);
    const now = moment();
    const days = start.diff(now, 'days')
    const hours = start.diff(now, 'hours')

    if(days > 0) {
      return days + ' дней'
    }
    if( hours > 0) {
      return hours + ' часов';
    } else {
      const minutes = start.diff(now, 'minutes')
      if(minutes < 0) {
        return 'Прошло'
      }
      return minutes + ' минут'
    }
  }
}
