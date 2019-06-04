import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../shared/shared.module';
import {AdminRoutingModule} from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { GroupsComponent } from './groups/groups.component';
import { CafedrasComponent } from './cafedras/cafedras.component';
import { TeachersComponent } from './teachers/teachers.component';
import { LessonsComponent } from './lessons/lessons.component';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptor} from '../../core/auth.interseptor';

@NgModule({
  declarations: [AdminComponent, DashboardComponent, GroupsComponent, CafedrasComponent, TeachersComponent, LessonsComponent],
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
