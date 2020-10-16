import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
//config
import {config} from '../utils/config'; 

import { BaseResponse } from '../models/BaseResponse';
@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }
  
  getDashboard(): Observable<BaseResponse>{
    return  this.http.get<BaseResponse>(config.url_api+"Home/GetDashboard")
    .pipe(
    )
  }

  getCharts(idCustomer: number): Observable<BaseResponse>{
    return  this.http.get<BaseResponse>(config.url_api+"Home/GetCharts/"+idCustomer)
    .pipe(
    )
  }


}
