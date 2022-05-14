import { Component, Input, OnInit } from '@angular/core';
import { AnalysisHttpHandler } from '../../../service-api/analysis-http.handler';
import { CriteriaAddService } from '../../services/criteria-add.service';
import { Criteria } from '../../models/criteria.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-criteria-add',
  templateUrl: './criteria-add.component.html',
  styleUrls: ['./criteria-add.component.css']
})
export class CriteriaAddComponent implements OnInit {
  criteriaForm: FormGroup;
  public submitted = false;
  tableName = "";
  payload = [];
  query = "";

  constructor(private formBuilder: FormBuilder,private criteriaAddService:CriteriaAddService,
    private analysisHttpService: AnalysisHttpHandler) { 
    this.criteriaForm = this.formBuilder.group({
      name: ["", [Validators.required]]
    });
  }
  @Input('tableName') set setTableName(data) {
    debugger;
    console.log("Criteria Add: tableName");
    if (data) {
      this.tableName = data;
    }else{
      this.tableName = "";
    }
  }
  @Input('payload') set setPayload(data) {
    console.log("Criteria Add: tableName");

    debugger;
    if (data) {
      this.payload = data;
    }else{
      this.payload = [];
    }
  }
  @Input('query') set setQuery(data) {
    console.log("Criteria Add: tableName");

    debugger;
    if (data) {
      console.log("query.");
      this.query = data;
    }else{
    }
  }

  ngOnInit(): void {
    
  }
  onAdd(): void{
    this.submitted = true;
    if (this.criteriaForm.valid) {
      var contentObj={query:this.query,payload:this.payload};
      let content=JSON.stringify(contentObj); 
      console.log(content);
      var criteria: Criteria = {name: this.criteriaForm.controls['name'].value,tableName:this.tableName,content: content};
      this.analysisHttpService.post("SaveCriteria", criteria).subscribe(result => {
        alert("Successfully saved");
        console.log(result);
        this.submitted = false;
        this.criteriaForm.reset();
      }, err => {
        
      });
    }
  }
  ngOnChanges() {
    /**********THIS FUNCTION WILL TRIGGER WHEN PARENT COMPONENT UPDATES 'someInput'**************/
     console.log("Changes Trigger payload Criteria Add:");
     console.log(this.payload);
  } 

  get formControl() {
    return this.criteriaForm.controls;
  }
}
