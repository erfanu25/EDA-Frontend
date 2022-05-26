import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import IMapper from "../domain/data-mapping.domain";
import IMapperName from "../domain/mapper-name.domain";
import * as endpoints from "./data-mapping.endpoints";
import ITable from "../domain/table-details.domain";

@Injectable()
export class DataMappingService {

  constructor(private http: HttpClient) {

  }

  public getTableList(): Observable<ITable[]> {
    return this.http.get<ITable[]>(endpoints.table_url);
  }

  public getMapperNames(queryParam): Observable<IMapperName[]> {
    const httpParams = new HttpParams({
      fromObject: queryParam
    });
    return this.http.get<IMapperName[]>(endpoints.mapper_name_url, { params: httpParams });;
  }

  public saveMapping(mapper): Observable<IMapper> {
    return this.http.post<IMapper>(endpoints.save_mapping_url, mapper);
  }

  public updateMapping(mapper): Observable<IMapper> {
    return this.http.post<IMapper>(endpoints.update_mapper_url, mapper);
  }

  public getExcelDataWithMapping(dataMap, queryParam): Observable<any> {
    const httpParams = new HttpParams({
      fromObject: queryParam
    });
    return this.http.post<IMapper>(endpoints.get_data_with_mapping, dataMap, { params: httpParams });
  }

  public getExcelHeaders(queryParam): Observable<any> {
    console.log(queryParam);
    const httpParams = new HttpParams({
      fromObject: queryParam
    });
    return this.http.get<any>(endpoints.get_excel_headers, { params: httpParams });;
  }

  public getTableColumns(queryParam): Observable<string[]> {
    const httpParams = new HttpParams({
      fromObject: queryParam
    });
    return this.http.get<string[]>(endpoints.column_list_url, { params: httpParams });;
  }
  public GetColumnsWithTypes(queryParam): Observable<string[]> {
    const httpParams = new HttpParams({
      fromObject: queryParam
    });
    return this.http.get<any>(endpoints.columns_types, { params: httpParams });;
  }

  

  public getMapper(queryParam): Observable<string[]> {
    const httpParams = new HttpParams({
      fromObject: queryParam
    });
    return this.http.get<string[]>(endpoints.get_mapper_url, { params: httpParams });;
  }

}
