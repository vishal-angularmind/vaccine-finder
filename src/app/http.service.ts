import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HttpClient,
   ) {

  }

 
  headers() {
    let headers = {};
   
    return new HttpHeaders({
      "Content-Type": "application/json",
      ...headers
    });
  }

  get(url: string, params?: object) {
    
    return this.http.get(url, params);
  }

  put(url: string, data?: any, params?: object) {
    const apiUrl = `${url}${params}`;
    return this.http.put(apiUrl, data, {
      headers: this.headers()
    });
  }

  post(url: string, data?: any, params?: object) {
    const apiUrl = `${url}${params}`;
    return this.http.post(apiUrl, data, {
      headers: this.headers()
    });
  }

 
  delete(url: string) {
    const apiUrl = `${url}`;
    return this.http.delete(apiUrl, {
      headers: this.headers()
    });
  }

 

  
}