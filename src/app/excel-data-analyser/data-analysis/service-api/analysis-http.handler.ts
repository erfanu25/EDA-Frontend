import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpHandler } from './http.handler';
import { Observable } from 'rxjs';
import * as _ from 'lodash';

@Injectable()
export class AppHttpService extends HttpHandler {

  private readonly baseUrl = 'http://localhost:8080/';

  constructor(protected override httpClient: HttpClient,
  ) {
    super(httpClient);
    this.requestOptions.headers = new HttpHeaders();
  }

  override get(pathOrUrl: string, searchItems?: object): Observable<Object> {
    return super.get(this.getUrl(pathOrUrl), searchItems);
  }

  override post(pathOrUrl: string, data: object): Observable<Object> {
    return super.post(this.getUrl(pathOrUrl), data);
  }

  private getUrl(pathOrUrl: string) {
    return pathOrUrl.indexOf('http') === 0 ? pathOrUrl : (this.baseUrl + pathOrUrl);
  }
}