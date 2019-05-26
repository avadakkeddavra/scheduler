import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';
import {Teacher} from '../models/teacher';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(private http: HttpClient) { }

  create(data: Teacher) {
    delete data.token;
    return this.http.post(environment.api + '/teachers', data);
  }

  delete(id: number) {
    return this.http.delete(environment.api + `/teachers/${id}`);
  }

  bulkDelete(ids: number[]) {
    return this.http.post(environment.api + `/teachers/delete`, {ids});
  }

  update(id: number, data: Teacher) {
    const dataSend = Object.assign({}, data);
    delete dataSend.id;
    delete dataSend.cafedra;
    delete dataSend.token;
    return this.http.put(environment.api + `/teachers/${id}`, dataSend);
  }
  getAll(params: any) {
    return this.http.get(environment.api + '/teachers', {params}).pipe(
      map((data: any) => {
        return data;
      })
    );
  }
}
