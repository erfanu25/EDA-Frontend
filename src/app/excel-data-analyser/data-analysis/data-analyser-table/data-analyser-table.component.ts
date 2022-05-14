import {
  ChangeDetectorRef,
  Component, Input,
  OnInit,
  PipeTransform,
  QueryList,
  ViewChildren,
  OnChanges 
} from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from "rxjs";
import { EmpDetails } from "../domain/data-analysis.domain";
import { DecimalPipe } from "@angular/common";
import { debounceTime, delay, switchMap, tap } from "rxjs/operators";
// import {TableService} from "./service/data-analyser-table.service";
import { HttpParams } from "@angular/common/http";
import { DataAnalysisService } from '../service-api/data-analysis.service';

@Component({
  selector: 'app-data-analyser-table',
  templateUrl: './data-analyser-table.component.html',
  styleUrls: ['./data-analyser-table.component.css'],
  providers: [DecimalPipe]
})
export class DataAnalyserTableComponent implements OnInit {
  tableDetails: EmpDetails[];
  employee$: Observable<EmpDetails[]>;
  total: number;
  page: number;
  pageSize: number;
  headerElements: string[];
  sortingFlag: number;
  sortBy: string;
  sortType: Number;
  tableName:string;
  payload:any;
  columnWithTypeList:any;
  showableColumnWithTypes:any;

  @Input('columnWithTypes') set columnWithTypes(data) {
    if (data) {
      this.columnWithTypeList = data;
    }else{
      this.columnWithTypeList=[];
    }
  }
  @Input('showableColumn') set showableColumn(data) {
    if (data) {
      debugger;
      this.showableColumnWithTypes=[];
      this.headerElements = data;
      console.log(this.headerElements);
      this.columnWithTypeList.forEach((element, index) => {
        let item = this.headerElements.find(item => item.trim() === element.key.trim());
        if(item){
         this.showableColumnWithTypes.push(element);
        }
      });
      console.log(this.showableColumnWithTypes);
    }else{
      this.showableColumnWithTypes=[];
    }

  }

  
  
  @Input('tableName') set setTableName(data) {
    if (data) {
      this.tableName = data;
    }
  }
  @Input('payloadFilters') set setPayloadFilters(data) {
    debugger;
    if (data) {
      console.log("this is in input table components.");
      this.payload = data;
    }else{
      this.payload = [];
    }
  }
  @Input('payloadCriteriaView') set setPayloadCriteriaView(data) {
    debugger;
    if (data) {
      console.log("setPayloadCriteriaView.");
      this.payload = data;
    }else{
      this.payload = [];
    }
  }
  @Input('queryCriteriaView') set setQueryCriteriaView(data) {
    debugger;
    if (data) {
      console.log("setQueryCriteriaView.");
      const urlParams = new URLSearchParams(data);
      console.log(urlParams);
      this.sortBy=urlParams.get('sortBy');
      this.sortType=parseInt(urlParams.get('sortType'));
      this.page=parseInt(urlParams.get('pageIndex'));
      this.pageSize=parseInt(urlParams.get('pageSize'));
    }else{
      this.sortBy = "name";
      this.sortType = -1;
      this.pageSize = 10;
      this.page = 1
      this.total = 0;
    }
  }
  ngOnChanges() {
    /**********THIS FUNCTION WILL TRIGGER WHEN PARENT COMPONENT UPDATES 'someInput'**************/
     console.log("Changes Trigger payload:");
     console.log(this.payload);
     this.getList();
    } 

  constructor(
    private dataAnalysisService: DataAnalysisService) {}

  ngOnInit(): void {
    this.sortBy = "name";
    this.sortType = -1;
    this.pageSize = 10;
    this.page = 1
    this.total = 0;
    this.showableColumnWithTypes=this.columnWithTypeList;
    this.getList();

    // this.headerElements.forEach((value, index) => {
    //   let itemIndex = this.columnWithTypeList.findIndex(item => item.key.trim() === value.trim());
    //   if(itemIndex<0){
    //     this.columnWithTypeList.splice(index,1);
    //   }
    // });
  }

  gotoPage({ page, size }) {
    this.page = page;
    this.pageSize = size;
    this.getList();
  }

  sort(id) {
    this.sortBy = id;
    this.sortType = this.sortType == -1 ? 1 : -1;
    this.getList();

  }
  getList() {
    var query = ``;var tableName="";
    if(this.tableName==="EMPLOYEE"){
      tableName="Employee";
    }
    if(this.tableName==="COMPANY"){
      tableName="Company";
    }
    query = `getList?modelName=${tableName}&sortBy=${this.sortBy}&sortType=${this.sortType}&pageIndex=${this.page}&pageSize=${this.pageSize}`;

    this.dataAnalysisService.search(query,this.payload)
      .subscribe(data => {
        this.tableDetails = data.data;
        this.total = data.total;
      });
  }

}
