import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from '../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = 'http://localhost:8080';
  }


  post<TReq, TRes>(path: string, body: TReq): Observable<Response<TRes>> {
    return this.http.post<Response<TRes>>(this.baseUrl + path, body);
  }

  postWithToken<TReq, TRes>(path: string, body: TReq, headers?: any): Observable<Response<TRes>> {
    return this.http.post<Response<TRes>>(this.baseUrl + path, body, this.getHeaders(headers));
  }

  getWithToken<T>(path: string, headers?: any): Observable<Response<T>> {
    return this.http.get<Response<T>>(this.baseUrl + path, this.getHeaders(headers));
  }

  putWithToken<T>(path: string, body: T, headers?: any): Observable<Response<T>> {
    return this.http.put<Response<T>>(this.baseUrl + path, body, this.getHeaders(headers));
  }

  deleteWithToken<T>(path: string, headers?: any): Observable<Response<T>> {
    return this.http.delete<Response<T>>(this.baseUrl + path, this.getHeaders(headers));
  }

  getHeaders(headers?: any): { [key: string]: HttpHeaders } {
    headers = headers || {};
    headers['content-type'] = 'application/json';
    headers['token'] = JSON.parse(localStorage.getItem('token'));
    return { headers: new HttpHeaders(headers) }
  }

}
