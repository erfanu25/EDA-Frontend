import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Params} from "@angular/router";
import {environment} from "../../../../environments/environment.prod";
import {EmpDetails} from "../domain/data-analysis.domain";


@Injectable()
export class DataAnalysisService {
  constructor(private http: HttpClient) {
  }



  public getEmployeeList<T>(path: string, routerParams?: Params): Observable<EmpDetails[]> {
    let queryParams: Params = {};
    if (routerParams) {
      queryParams = this.setParameter(routerParams);
    }
    return this.http.get<EmpDetails[]>(this.path(path), { params: queryParams });
  }

  public getEmployeeData<T>(path: string): Observable<any> {
    return this.http.get(this.path(path), {});
  }
  public getList<T>(path: string,data:any): Observable<any> {
    return this.http.get(this.path(path), data);
  }
  public search<T>(path: string,data:any): Observable<any> {
    return this.http.post(this.path(path), data);
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
