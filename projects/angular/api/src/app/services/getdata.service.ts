import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetdataService {
  
  constructor(public httpclient: HttpClient ) {}

  baseUrl='https://api.github.com/users/'

  get(user: string): Observable<any> {
    return this.httpclient.get(`${this.baseUrl}${user}`);
}

 
}
