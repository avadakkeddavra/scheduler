import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../shared/shared.module';
import {AdminRoutingModule} from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import {CreateEventDialogComponent} from 'src/app/shared/create-event-dialog/create-event-dialog.component';
import { GroupsComponent } from './groups/groups.component';
import { CafedrasComponent } from './cafedras/cafedras.component';
import { TeachersComponent } from './teachers/teachers.component';
import { TimetableComponent } from './timetable/timetable.component';

@NgModule({
  declarations: [AdminComponent, DashboardComponent, GroupsComponent, CafedrasComponent, TeachersComponent, TimetableComponent],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })
  ],
  bootstrap: []
})
export class AdminModule { }
