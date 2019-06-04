import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {addDays, setHours, setMinutes} from 'date-fns';
import {Subject} from 'rxjs';
import {CalendarEvent, CalendarView} from 'angular-calendar';
import {MatDialog} from '@angular/material';
import {ScheduleService} from '../../core/services/schedule.service';
import {TeacherService} from '../../core/services/teacher.service';
import {GroupsService} from '../../core/services/groups.service';
import {LessonsService} from '../../core/services/lessons.service';
import {InfoService} from "../../core/services/info.service";
import {ClassesService} from "../../core/services/classes.service";
import {ShowEventComponent} from "../../shared/show-event/show-event.component";

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
  width = window.innerWidth;
  show = false;
  filters = {
    group: null,
    teacher: null,
    lesson: null
  }
  view: CalendarView = this.width >= 950 ? CalendarView.Week : CalendarView.Day;
  CurrentEvent;

  CalendarView = CalendarView;
  activeDayIsOpen = true;
  @ViewChild('main')
  mainContainer: ElementRef;

  viewDate: Date = new Date();

  events: CalendarEvent[] = [];
  refresh: Subject<any> = new Subject();
  Schdeule;
  Teachers = [];
  Lessons = [];
  Groups = [];

  day = new Date().getDay();
  constructor(
    public dialog: MatDialog,
    private schedule: ScheduleService,
    private teacher: TeacherService,
    private group: GroupsService,
    private lesson: LessonsService,
    private info: InfoService,
    private classes: ClassesService,
  ) { }

  ngOnInit() {
    this.getGroups();
    this.getTeacher();
    this.getLessons();
  }
  DisplayFn(array) {
    return (id: number) => {
      const value = array.find((item) => item.id === id);
      return value ? value.name : '';
    }
  }
  buildEvents(filters: {group?: number, teacher?: number, lesson?: number} = {}) {
    this.schedule.getAll({...filters, day: this.day }).subscribe((data) => {
      this.Schdeule = data;
      const events = [];
      this.Schdeule.forEach((schedule, index) => {
        const date = addDays(this.viewDate, index);
        schedule.schedules.forEach((item) => {
          const minutesEnd = Number(item.lesson_time.end.split(':')[1]);
          const minutesStart = Number(item.lesson_time.start.split(':')[1]);
          const hoursStart = Number(item.lesson_time.start.split(':')[0]);
          const hoursEnd = Number(item.lesson_time.end.split(':')[0]);
          const startDate = setHours(setMinutes(date, minutesStart), hoursStart);
          const endDate = setHours(setMinutes(date, minutesEnd), hoursEnd);
          events.push({
            id: item.id,
            data: item,
            start: startDate,
            end: endDate,
            title: `
              <b>${item.lesson_time.start} - ${item.lesson_time.end}</b><br>
              <b>${item.class.name} аудитория</b><br>
              <b>${item.teacher.name}</b><br>
              <b>${item.denomirator === 1 ? 'Числитель' : 'Знаментель'}</b><br>
              <h5>
              ${item.lesson.name}</h5>
            `,
            color: item.denomirator === 1 ? colors.green : colors.blue,
          });
        });
      });
      this.events = events;
    });
  }

  saveGroup(group_id) {
    const group = localStorage.getItem('group');

    if(!group || Number(group) === group_id) {
      localStorage.setItem('group', group_id.toString());
    }
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  getTeacher(search: string = '') {
    this.teacher.getAll(search).subscribe((data) => {
      this.Teachers = data;
    });
  }

  getGroups(search: string = '') {
    this.group.getWithSearch(search).subscribe((data) => {
      this.Groups = data;
      this.filters.group = Number(localStorage.getItem('group'))
      if(this.filters.group) {
        this.buildEvents(this.filters);
        this.show = true
      }
    });
  }

  getLessons(search: string = '') {
    this.lesson.getAll(search).subscribe((data) => {
      this.Lessons = data;
    });
  }


  search(searchData: {type: string, data: any}) {
    const {type, data} = searchData;

    switch (type) {
      case 'lesson':
        this.getLessons(data);
        break;
      case 'teacher':
        this.getTeacher(data);
        break;
      case 'group':
        this.getGroups(data);
        break;
    }
  }
  handleEvent({event}) {
    const dialogRef = this.dialog.open(ShowEventComponent, {
      width: '100vw',
      data:  event
    });
  }
}
