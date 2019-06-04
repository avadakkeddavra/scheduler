import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import {FeaturedRoutingModule} from './featured-routing.module';
import {SharedModule} from '../shared/shared.module';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    FeaturedRoutingModule,
    SharedModule,
    FormsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })
  ]
})
export class FeaturedModule { }
