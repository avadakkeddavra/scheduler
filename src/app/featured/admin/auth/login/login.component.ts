import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  User = {
    email: '',
    password: ''
  }
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      localStorage.setItem('token', 'hardcoded token');
      this.router.navigate(['/admin']);
    }
  }
}
