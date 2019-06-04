import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {addDays, setHours, setMinutes} from 'date-fns';
import {Subject} from 'rxjs';
import {CalendarEvent, CalendarView} from 'angular-calendar';
import {MatDialog} from '@angular/material';
import {ScheduleService} from '../../../core/services/schedule.service';
import {TeacherService} from '../../../core/services/teacher.service';
import {GroupsService} from '../../../core/services/groups.service';
import {LessonsService} from '../../../core/services/lessons.service';
import {InfoService} from "../../../core/services/info.service";
import {ClassesService} from "../../../core/services/classes.service";

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
  view: CalendarView = CalendarView.Week;
  CurrentEvent = {
    lesson_id: null,
    group_id: null,
    teacher_id: null,
    day_id: null,
    lesson_time_id: null,
    semester: null,
    denomirator: null,
    class_id: null
  }
  type = 'create';

  CalendarView = CalendarView;
  openDialog = false;
  activeDayIsOpen = true;
  @ViewChild('main')
  mainContainer: ElementRef;

  viewDate: Date = new Date();

  events: CalendarEvent[] = [];
  refresh: Subject<any> = new Subject();
  Schdeule;
  Teachers;
  Lessons;
  Days;
  Groups;
  Classes;
  LessonTimes;

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
    this.getDays();
    this.getTimes();
    this.getClasses();
    this.buildEvents();
  }

  buildEvents() {
    this.schedule.getAll({day: this.day }).subscribe((data) => {
      this.Schdeule = data;
      if (this.view === CalendarView.Day) { return; }
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
  dropEvent() {
    this.CurrentEvent = {
      lesson_id: null,
      group_id: null,
      teacher_id: null,
      day_id: null,
      lesson_time_id: null,
      semester: null,
      denomirator: null,
      class_id: null
    }
  }
  setView(view: CalendarView) {
    this.view = view;
  }
  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  addEvent(event): void {
    this.openDialog = false;
    this.schedule.create(event).subscribe((data) => {
      this.buildEvents();
    });
  }

  updateEvent({id, data}) {
    this.openDialog = false;
    this.schedule.update(id, data).subscribe((data) => {
      this.buildEvents();
    })
  }

  deleteEvent(id: number) {
    this.schedule.delete(id).subscribe((data) => {
      this.events.forEach((item, index) => {
        if(item.id === id) {
          this.events.splice(index, 1);
        }
      });
      this.openDialog = false;
      this.refresh.next(this.events)
    })
  }

  getTeacher(search: string = '') {
    this.teacher.getAll(search).subscribe((data) => {
      this.Teachers = data;
    });
  }

  getGroups(search: string = '') {
    this.group.getWithSearch(search).subscribe((data) => {
      this.Groups = data;
    });
  }

  getLessons(search: string = '') {
    this.lesson.getAll(search).subscribe((data) => {
      this.Lessons = data;
    });
  }

  getDays() {
    this.info.getDays().subscribe((data) => {
      this.Days = data;
    })
  }

  getTimes() {
    this.info.getTimes().subscribe((data) => {
      this.LessonTimes = data;
    })
  }
  getClasses(search: string = '') {
    this.classes.getAll(search).subscribe((data) => {
      this.Classes = data;
    })
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
      case 'classes':
        this.getClasses(data);
        break;
    }
  }
  handleEvent($event) {
    const {event} = $event;
    this.CurrentEvent = event.data;
    console.log(this.CurrentEvent);
    this.type = 'edit';
    this.openDialog = true;
  }
}
