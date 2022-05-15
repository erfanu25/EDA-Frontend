import { HttpClient } from '@angular/common/http';
import { FileContentListApiReqParam } from './model/file-content-list-api-req-param';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileContentServiceService {


  constructor(private http: HttpClient) { }

  public getAllFileContent(reqParam: FileContentListApiReqParam):
    Observable<any> {

    return this.http.get<any>(this.createCompleteRoute("api/fileContent",
      environment.urlAddress), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      params: new HttpParams()
        .set('page', reqParam.pageIndex.toString())
        .set('size', reqParam.pageSize.toString())
    });
  }
  private createCompleteRoute(route: string, envAddress: string) {
    return `${envAddress}/${route}`;
  }

  // private generateHeaders() {
  //   return {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       'Authorization': this.utility.getToken()
  //     })
  //   }
  // }


  public injectFile(fileId): Observable<any> {
    let file_injection_url = `https://localhost:8000/api/file2/${fileId}`;
    console.log(file_injection_url);
    return this.http.get<any>(file_injection_url);
  }





}
