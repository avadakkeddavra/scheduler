import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
  addMinutes
} from 'date-fns';
import { Subject } from 'rxjs';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView
} from 'angular-calendar';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  green: {
    primary: '#40bd7b',
    secondary: '#40bd7b'
  },
  blue: {
    primary: '#2756EE',
    secondary: '#2756EE'
  },
  yellow: {
    primary: '#e3682c',
    secondary: '#e3682c'
  }
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild('main')
  mainContainer: ElementRef;

  viewDate: Date = new Date();
  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];

  events: CalendarEvent[] = [
    {
      start: new Date('2019-05-23 8:00'),
      end: new Date('2019-05-23 9:30'),
      title: 'A 3 day event',
      color: colors.blue,
      actions: this.actions,
      cssClass: '.card',
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    },
    {
      start:  new Date('2019-05-23 11:45'),
      end:  new Date('2019-05-23 13:05'),
      title: '<b>11:45-13:05</b> <br/> An event with no end date',
      color: colors.blue,
      actions: this.actions
    },
    {
      start: new Date('2019-05-23 9:45'),
      end: new Date('2019-05-23 11:15'),
      title: 'A draggable and resizable event',
      color: colors.green,
      actions: this.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    }
  ];
  constructor() { }
  ngOnInit() {
  }

  handleEvent(action: string, event: CalendarEvent): void {
    console.log(action, event);
  }

  eventTimesChanged({
                      event,
                      newStart,
                      newEnd
                    }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map(iEvent => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }
  smoothScroll() {
    this.mainContainer.nativeElement.scrollIntoView({behavior: 'smooth'});
  }
}
