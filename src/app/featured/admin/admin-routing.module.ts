import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminComponent} from './admin.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AuthGuard} from '../../core/guards/auth.guard';
import {GroupsComponent} from './groups/groups.component';
import {CafedrasComponent} from './cafedras/cafedras.component';
import {TeachersComponent} from './teachers/teachers.component';
import {LessonsComponent} from './lessons/lessons.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'auth',
        loadChildren: './auth/auth.module#AuthModule'
      },
      {
        path: '',
        canActivate: [AuthGuard],
        component: DashboardComponent
      },
      {
        path: 'groups',
        canActivate: [AuthGuard],
        component: GroupsComponent
      },
      {
        path: 'cafedras',
        canActivate: [AuthGuard],
        component: CafedrasComponent
      },
      {
        path: 'teachers',
        canActivate: [AuthGuard],
        component: TeachersComponent
      },
      {
        path: 'lessons',
        canActivate: [AuthGuard],
        component: LessonsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
