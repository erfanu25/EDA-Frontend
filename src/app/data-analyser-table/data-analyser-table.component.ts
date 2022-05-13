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
import { EmpDetails } from "../excel-data-analyser/data-analysis/domain/data-analysis.domain";
import { DecimalPipe } from "@angular/common";
import { debounceTime, delay, switchMap, tap } from "rxjs/operators";
// import {TableService} from "./service/data-analyser-table.service";
import { HttpParams } from "@angular/common/http";
import { DataAnalysisService } from "../excel-data-analyser/data-analysis/service-api/data-analysis.service";

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
  payload:string;
  columnWithTypeList:any;
  showableColumnWithTypes:any;

  @Input('columnWithTypes') set columnWithTypes(data) {
    if (data) {
      this.columnWithTypeList = data;
    }
  }
  @Input('showableColumn') set showableColumn(data) {
    if (data) {
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
    var query = ``;
    if(this.tableName==="EMPLOYEE"){
      query = `getList?modelName=Employee&sortBy=${this.sortBy}&sortType=${this.sortType}&pageIndex=${this.page}&pageSize=${this.pageSize}`;
    }
    this.dataAnalysisService.search(query,this.payload)
      .subscribe(data => {
        this.tableDetails = data.data;
        this.total = data.total;
      });
  }

}
