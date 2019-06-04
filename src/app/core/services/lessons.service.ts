import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Lesson} from '../models/lesson';

@Injectable({
  providedIn: 'root'
})
export class LessonsService {

  constructor(private http: HttpClient) { }

  create(data: Lesson) {
    return this.http.post(environment.api + '/lessons', data);
  }

  delete(id: number) {
    return this.http.delete(environment.api + `/lessons/${id}`);
  }

  update(id: number, data: Lesson) {
    return this.http.put(environment.api + '/lessons/' + id, {
      name: data.name,
      cafedra_id: data.cafedra_id,
      teacher_id: data.teacher_id
    });
  }

  getAll(search?: string): Observable<Lesson[]> {
    return this.http.get(environment.api + '/lessons', {params: {search}}).pipe(
      map((data: Lesson[]) => {
        return data;
      })
    );
  }

  bulkDelete(ids: number[]) {
    return this.http.post(environment.api + `/lessons/delete`, {ids});
  }

  getAllWithPagintaion(params: any): Observable<Lesson[]> {
    return this.http.get(environment.api + '/lessons/all', {params}).pipe(
      map((data: Lesson[]) => {
        return data;
      })
    );
  }
}
