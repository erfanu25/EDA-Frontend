import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpHandler {

  protected readonly requestOptions: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe?: 'body';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
  };

  constructor(protected httpClient: HttpClient) {
    this.requestOptions = {};
  }

  get(url: string, searchItems?: object): Observable<Object> {
    return this.httpClient.get(url, this.requestOptions);
  }

  post(url: string, data: object | string): Observable<Object> {
    return this.httpClient.post(url, data, this.requestOptions);
  }

  put(url: string, data: object): Observable<Object> {
    return this.httpClient.put(url, data, this.requestOptions);
  }

  delete(url: string): Observable<Object> {
    return this.httpClient.delete(url, this.requestOptions);
  }

}