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
export class UsersService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<BaseResponse>{
    return  this.http.get<BaseResponse>(config.url_api+"Users/")
    .pipe(
    )
  }

  saveUsers(sale: any): Observable<BaseResponse> {
    return  this.http.put<BaseResponse>(config.url_api+"Users/",sale)
    .pipe(
    )
  }

  deleteUsers(idUser: number): Observable<BaseResponse> {
    return  this.http.delete<BaseResponse>(config.url_api+"Users/" + idUser)
  }

}
