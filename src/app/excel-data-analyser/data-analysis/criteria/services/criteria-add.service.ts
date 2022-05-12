import { Injectable } from "@angular/core";
import { AnalysisHttpHandler } from "../../service-api/analysis-http.handler";
import { Observable } from "rxjs";
import { Criteria } from "../models/criteria.model";
import { Result } from "../models/result.model";

@Injectable()
export class CriteriaAddService {
  constructor(private analysisHttpService: AnalysisHttpHandler) {}
  
  // public add(criteria :Criteria):Observable<any>  {
  //   var observable = new Observable<any>((subcriber) => {
  //     this.analysisHttpService.post("criteria", criteria).subscribe(data => {
  //       return new Result();
  //     }, err => {
  //       return new Result();
  //     });
  //   })
  //   return observable;
  // }
}

