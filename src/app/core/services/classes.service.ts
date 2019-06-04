import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClassesService {

  constructor(private http: HttpClient) { }

  create(data) {
    return this.http.post(environment.api + '/classes', data);
  }

  delete(id: number) {
    return this.http.delete(environment.api + `/classes/${id}`);
  }

  update(id: number, data) {
    return this.http.put(environment.api + '/classes/' + id, {
      name: data.name
    });
  }

  getAll(search: string = '') {
    return this.http.get(environment.api + '/classes', {params: {search}}).pipe(
      map((data) => {
        return data;
      })
    );
  }

  bulkDelete(ids: number[]) {
    return this.http.post(environment.api + `/classes/delete`, {ids});
  }

}
