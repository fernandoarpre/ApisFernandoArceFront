import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
//config
import {config} from '../utils/config'; 

import { BaseResponse } from '../models/BaseResponse';
import { Sale } from '../models/Sale';

@Injectable({
  providedIn: 'root'
})
export class SalesService {
  
  

  constructor(private http: HttpClient) { }

  getSales(): Observable<BaseResponse>{
    return  this.http.get<BaseResponse>(config.url_api+"Sales/")
    .pipe(
    )
  }

  saveSales(sale: any): Observable<BaseResponse> {
    return  this.http.put<BaseResponse>(config.url_api+"Sales/",sale)
    .pipe(
    )
  }

  deletesales(idSale: number): Observable<BaseResponse> {
    return  this.http.delete<BaseResponse>(config.url_api+"Sales/" + idSale)
  }

}
