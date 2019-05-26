import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Cafedra} from '../models/cafedra';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CafedrasService {

  constructor(private http: HttpClient) { }

  create(data: Cafedra) {
    return this.http.post(environment.api + '/cafedras', data);
  }

  delete(id: number) {
    return this.http.delete(environment.api + `/cafedras/${id}`);
  }

  update(id: number, data: Cafedra) {
    return this.http.post(environment.api + '/cafedras', data);
  }

  getAll(): Observable<Cafedra[]> {
    return this.http.get(environment.api + '/cafedras').pipe(
      map((data: Cafedra[]) => {
        return data;
      })
    );
  }
}
