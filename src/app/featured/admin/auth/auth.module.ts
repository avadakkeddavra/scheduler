import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { ForgotPassswordComponent } from './forgot-passsword/forgot-passsword.component';
import {AuthRoutingModule} from './auth-routing.module';
import {SharedModule} from '../../../shared/shared.module';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [AuthComponent, LoginComponent, ForgotPassswordComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class AuthModule { }
