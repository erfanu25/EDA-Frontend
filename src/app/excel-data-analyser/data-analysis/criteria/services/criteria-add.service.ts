import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import { HttpParams } from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable()
export class CriteriaAddService {
  constructor(private http: HttpClient) {

  }
  public add(): Observable<any>{
    return this.http.get("");
  }
}

