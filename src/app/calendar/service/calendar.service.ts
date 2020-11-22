import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
const url = 'http://localhost:8080/calendar';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(private http: HttpClient) { }

  getMonthWithDays(year: number, month: number): Observable<any> {
    return this.http.get(url + '/getMonthWithDays', {params: {getYear: String(year), getMonth: String(month)
    }});
  }

  addTask(task: any): Observable<any> {
    return this.http.post(url + '/addTask', task);
  }

  checkCorrectTime(task: any): Observable<any> {
    return this.http.post(url + '/checkCorrectTime', task);
  }

  getOneDay(yearS: any, monthS: any, dayS: any): Observable<any> {
    return this.http.get(url + '/getOneDay', {params: {year: yearS, month: monthS, day: dayS}});
  }

  deleteTaskById(idT: any): Observable<any> {
    return this.http.delete(url + '/deleteTaskById', {params: {id: String(idT)}});
  }
}
