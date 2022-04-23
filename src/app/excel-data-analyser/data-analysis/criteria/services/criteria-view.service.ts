import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AnalysisHttpHandler } from "../../service-api/analysis-http.handler";
import { Observable } from "rxjs";

@Injectable()
export class CriteriaViewService {
  constructor(private analysisHttpHandler: AnalysisHttpHandler) {}
  
  public fetchCriteriaList(): any {
    this.analysisHttpHandler.get(`employees/subordinates`).subscribe(data => {
      return data;
    }, err => {
      return err;
    })
  }
}
