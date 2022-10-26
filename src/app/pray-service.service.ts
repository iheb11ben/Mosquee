import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { map, switchMap } from 'rxjs/operators';
import { Time } from './time';
import * as ap from './../assets/salat.json'
const API_BASE = 'https://api.aladhan.com/v1/timings/{{TIMESTAMP}}?latitude={{LATITUDE}}&longitude={{LONGITUDE}}&method=2';







const TIMESTAMP = '{{TIMESTAMP}}';
const LATITUDE = '{{LATITUDE}}';
const LONGITUDE = '{{LONGITUDE}}';
@Injectable({
  providedIn: 'root'
})
export class PrayServiceService {
   api =ap
   date = new Date()
 
   
  urlGenerate$ = new Observable<string>(function (observer) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const d = '' + Math.floor((+ new Date()) / 1000);
        const url: string = API_BASE.replace(TIMESTAMP, d)
          .replace(LONGITUDE, '' + position.coords.longitude)
          .replace(LATITUDE, '' + position.coords.latitude);
      
        observer.next(url);
      });
    }
  });
  constructor(private http: HttpClient) { }
  get() {
console.log('api',this.api.data.find(x=>x.date.gregorian.date==='02-01-2023'));
let now_ = moment(this.date);


    return this.urlGenerate$.pipe(switchMap(_ => this.http.get<Time>(_)));
  }
  get2() {

    console.log('api',this.api.data.find(x=>x.date.gregorian.date==='01-01-2023'));
    let now_ = moment(this.date);
    
    
        return this.urlGenerate$.pipe(switchMap(_ => this.http.get<Time>(_)));
      }
}
