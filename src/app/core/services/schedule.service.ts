import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(private http: HttpClient) { }

  getAll(params) {
    return this.http.get(environment.api + '/schedule', {params});
  }

  create(event) {
    return this.http.post(environment.api + '/schedule', event);
  }

  delete(id: number) {
    return this.http.delete(environment.api + '/schedule/' + id)
  }
  update(id: number, data) {
    const body = Object.assign({}, data);
    delete body.day;
    delete body.id;
    delete body.lesson;
    delete body.class;
    delete body.teacher;
    delete body.group;
    delete body.lesson_time;
    return this.http.put(environment.api + '/schedule/' + id, body)
  }
}
