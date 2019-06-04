import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import * as decode from 'jwt-decode';
import {Observable, Subject} from 'rxjs';
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  observer;
  constructor(private http: HttpClient) {}

  loginAsTeacher(token: string) {
    return this.http.post(environment.api + '/login/teacher', {token}).pipe(
      map((res: any) => {
        this.spread(decode(token));
        return res;
      })
    );
  }

  login(data: {email: string, password: string}) {
     return this.http.post(environment.api + '/login', data).pipe(
       map((res: any) => {
         this.spread(decode(res.token));
         return res;
       })
     );
  }

  getUser() {
    return new Observable((observer) => {
      this.observer = observer;
      const token = localStorage.getItem('token');
      if (token) {
       observer.next(decode(token));
      } else {
        observer.next(false);
      }
    });

  }
  logout() {
    this.spread(false);
    localStorage.removeItem('token');
  }

  spread(data) {
    if(this.observer) {
      this.observer.next(data);
    }
  }
}
