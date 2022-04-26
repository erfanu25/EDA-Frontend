import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Params} from "@angular/router";
import {environment} from "../../../../environments/environment.prod";


@Injectable()
export class DataAnalysisService {
  constructor(private http: HttpClient) {
  }



  public getStudentList<T>(path: string, routerParams?: Params): Observable<T> {
    let queryParams: Params = {};
    if (routerParams) {
      queryParams = this.setParameter(routerParams);
    }
    console.log(queryParams);
    return this.http.get<T>(this.path(path), { params: queryParams });
  }


  private setParameter(routerParams: Params): HttpParams {
    let queryParams = new HttpParams();
    for (const key in routerParams) {
      if (routerParams.hasOwnProperty(key)) {
        queryParams = queryParams.set(key, routerParams[key]);
      }
    }
    return queryParams;
  }

  private path(path: string): string {
    return `${environment.API_URL}${path}`;
  }
}
