import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { AnalysisHttpHandler } from '../../../service-api/analysis-http.handler';
import { Criteria } from '../../models/criteria.model';
@Component({
  selector: 'app-criteria',
  templateUrl: './criteria.component.html',
  styleUrls: ['./criteria.component.css'],
})

export class CriteriaComponent implements OnInit {
  criteriaViews: any;
  @Output() selectedCriteriaOutput = new EventEmitter();

  constructor(private analysisHttpService: AnalysisHttpHandler) {
    this.GetCriteriaList();
  }
  ngOnInit(): void {}
  GetCriteriaList() {
    this.analysisHttpService.get(`GetCriteriaView`).subscribe(data => {
      this.criteriaViews=data;
    }, err => {
      console.log(err);
    })
  }
  
  onClick(view){
    this.selectedCriteriaOutput.emit(view); 
  }

}
