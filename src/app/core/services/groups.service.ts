import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Group} from '../models/group';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  constructor(private http: HttpClient) { }

  create(data: Group) {
    return this.http.post(environment.api + '/groups', data);
  }

  delete(id: number) {
    return this.http.delete(environment.api + `/groups/${id}`);
  }
  bulkDelete(ids: number[]) {
    return this.http.post(environment.api + `/groups/delete`, {ids});
  }

  update(id: number, data: Group) {
    const dataSend = Object.assign({}, data);
    delete dataSend.id;
    delete dataSend.cafedra;
    return this.http.put(environment.api + `/groups/${id}`, dataSend);
  }

  getAll(params) {
    return this.http.get(environment.api + '/groups', {params}).pipe(
      map((data: Group[]) => {
        return data;
      })
    );
  }
}
