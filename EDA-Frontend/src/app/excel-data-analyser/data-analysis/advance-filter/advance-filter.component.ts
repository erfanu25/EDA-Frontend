import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { Criteria } from '../criteria/models/criteria.model';
import { SearchCriteria } from '../criteria/models/search-criteria.model';
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
  advanceFilterList: SearchCriteria[]=[];
  tableName:any;
  displayCriteriaAddComponents: boolean;
  criteriaForm: FormGroup;
  public submitted = false;
  query:string;
  canUpdateView:boolean=false;

  @Input('columnWithTypes') set columnWithTypes(data) {
    if (data) {
      this.headers = data;
    }
  }
  @Input('tableName') set setTableName(data) {
    if (data) {
      this.tableName =data;
    }
  }
  @Input('canUpdateView') set setCanUpdateView(data) {
    if (data) {
      this.canUpdateView =data;
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
  updatedFilter(obj: SearchCriteria) {
    if (this.advanceFilterList.some(item => item.field.trim() === obj.field.trim() )) {
      let itemIndex = this.advanceFilterList.findIndex(item => item.field.trim() === obj.field.trim());
      if(obj.operator=="Number_Range"){
        if(obj.minValue== undefined || obj.minValue == "" ){
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
      if(obj.operator=="Number_Range"){
        if(obj.minValue!==""){
          this.advanceFilterList.push(obj);
        }
      }else{
        if(obj.value!==""){
          this.advanceFilterList.push(obj);
        }
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
      let content=JSON.stringify({query:this.query,payload:this.advanceFilterList}); 
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
}
  
}
