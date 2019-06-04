import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  constructor(private http: HttpClient) { }

  getDays() {
    return this.http.get(environment.api + '/days');
  }

  getTimes() {
    return this.http.get(environment.api + '/lesson_times');
  }
}
