import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
//config
import {config} from '../utils/config'; 

import { BaseResponse } from '../models/BaseResponse';
import { Cities } from '../models/Cities';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  constructor(private http: HttpClient) {
    
  }

  getCustomers(): Observable<BaseResponse>{
    return  this.http.get<BaseResponse>(config.url_api+"Customer/")
    .pipe(
    )
  }

  saveCustomers(customer: any): Observable<BaseResponse>{
    return  this.http.put<BaseResponse>(config.url_api+"Customer/",customer)
    .pipe(
    )
  }

  deleteCustomers(idCustomer: number): Observable<BaseResponse>{
    return  this.http.delete<BaseResponse>(config.url_api+"Customer/" + idCustomer) 
  }

  getCities(): Observable<Cities[]>{
    return  this.http.get<Cities[]>("https://www.datos.gov.co/resource/p95u-vi7k.json")
    .pipe(
    )
  }
  //https://www.datos.gov.co/resource/p95u-vi7k.json
}
