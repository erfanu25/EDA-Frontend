import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { Criteria } from '../criteria/models/criteria.model';
import { CriteriaAddService } from '../criteria/services/criteria-add.service';
import { AnalysisHttpHandler } from '../service-api/analysis-http.handler';
import { DateCriteria, EmpDetails, NumberCriteria, TableType, TextCriteria } from "./../domain/data-analysis.domain";
@Component({
  selector: 'app-advance-filter',
  templateUrl: './advance-filter.component.html',
  styleUrls: ['./advance-filter.component.css']
})
export class AdvanceFilterComponent implements OnInit {

  headers: string[];
  textCriteria: SelectItem[] = TextCriteria;
  dateCriteria: SelectItem[] = DateCriteria;
  numberCriteria: SelectItem[] = NumberCriteria;
  details: EmpDetails[];
  filterDropDownCriteria: "";
  advanceFilterList = [];
  tableName:any;
  displayCriteriaAddComponents: boolean;
  criteriaForm: FormGroup;
  public submitted = false;
  query:string;

  @Input('columnWithTypes') set columnWithTypes(data) {
    if (data) {
      this.headers = data;
    }
  }
  @Input('tableName') set setTableName(data) {
    if (data) {
      if(data=="EMPLOYEE"){
        this.tableName ="Employee";
      } 
      if(data=="COMPANY"){
        this.tableName ="Company";
      }
    }
  }
  @Output() filterListChange = new EventEmitter<any>();
  constructor(private activatedRouter: ActivatedRoute,private formBuilder: FormBuilder,private criteriaAddService:CriteriaAddService,
    private analysisHttpService: AnalysisHttpHandler,private _snackBar: MatSnackBar,private router:Router
  ) {
    
    this.criteriaForm = this.formBuilder.group({
      name: ["", [Validators.required]]
    });
   }

  ngOnInit(): void {
    this.displayCriteriaAddComponents = false;

  }
  onCriteriaViewClick() {
    this.displayCriteriaAddComponents = true;
  }
  updatedFilter(obj) {
    debugger
    if (this.advanceFilterList.some(item => item.field.trim() === obj.field.trim() )) {
      let itemIndex = this.advanceFilterList.findIndex(item => item.field.trim() === obj.field.trim());
      if(obj.operator=="Number_Range"){
        if(obj.value1== undefined || obj.value1 == "" ){
          this.advanceFilterList.splice(itemIndex,1);
        }else{
          this.advanceFilterList[itemIndex] = obj;
        }
      }else{
        if(obj.value== undefined || obj.value == "" ){
          this.advanceFilterList.splice(itemIndex,1);
        }else{
          this.advanceFilterList[itemIndex] = obj;
        }
      }


    } else {
      if(obj.value!==""){
        this.advanceFilterList.push(obj);
      }
    }
  }
  onApply() {
    this.filterListChange.emit(this.advanceFilterList);

  }
  saveAsView() {
    this.displayCriteriaAddComponents = true;
  }
  onAdd(): void{
    this.submitted = true;
    if (this.criteriaForm.valid) {
      this.query="sortBy=name&sortType=-1&pageIndex=1&pageSize=10";
      var contentObj={query:this.query,payload:this.advanceFilterList};
      let content=JSON.stringify(contentObj); 
      var criteria: Criteria = {name: this.criteriaForm.controls['name'].value,tableName:this.tableName,content: content};
      this.analysisHttpService.post("SaveCriteria", criteria).subscribe(result => {
        this._snackBar.open('Search Result has been saved successfully', 'Ok', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
          panelClass: 'my-custom-snackbar'
        })
        this.submitted = false;
        this.criteriaForm.reset();
        this.displayCriteriaAddComponents=false;
        this.reloadCurrentRoute();
      }, err => {
        
      });
    }
  }
  reloadCurrentRoute() {
    const random = Math.random().toFixed(5);
    this.router.navigate([], {
      relativeTo: this.activatedRouter,
      queryParams: {tableName: this.tableName,random},
      queryParamsHandling: 'merge',
    });
    // const currentUrl = this.router.url;
    // this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
    //     this.router.navigate([currentUrl]);
    // });

}
  
}
