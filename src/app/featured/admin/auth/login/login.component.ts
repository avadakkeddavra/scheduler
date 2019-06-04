import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isAdmin = true;
  User = {
    email: '',
    password: ''
  };
  Token = '';
  constructor(
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit() {
  }
  toggleAuth() {
    this.isAdmin = !this.isAdmin;
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.auth.login(this.User).subscribe((data: {success: boolean, token: string}) => {
        localStorage.setItem('token', data.token);
        this.router.navigate(['/admin']);
      });
    }
  }
  onSubmitTeacher() {
    if (this.Token !== '') {
      this.auth.loginAsTeacher(this.Token).subscribe((data: {success: boolean}) => {
        if (data.success) {
          localStorage.setItem('token', this.Token);
          this.router.navigate(['/admin']);
        }
      });
    }
  }
}
