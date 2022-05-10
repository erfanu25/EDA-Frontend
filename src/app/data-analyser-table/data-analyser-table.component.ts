import {
  ChangeDetectorRef,
  Component, Input,
  OnInit,
  PipeTransform,
  QueryList,
  ViewChildren
} from '@angular/core';
import {BehaviorSubject, Observable, of, Subject} from "rxjs";
import {EmpDetails} from "../excel-data-analyser/data-analysis/domain/data-analysis.domain";
import {DecimalPipe} from "@angular/common";
import {debounceTime, delay, switchMap, tap} from "rxjs/operators";
// import {TableService} from "./service/data-analyser-table.service";
import {HttpParams} from "@angular/common/http";
import {DataAnalysisService} from "../excel-data-analyser/data-analysis/service-api/data-analysis.service";






@Component({
  selector: 'app-data-analyser-table',
  templateUrl: './data-analyser-table.component.html',
  styleUrls: ['./data-analyser-table.component.css'],
  providers: [ DecimalPipe]
})
export class DataAnalyserTableComponent implements OnInit {
  tableDetails: EmpDetails[];
  employee$: Observable<EmpDetails[]>;
  total: number;
  page: number;
  pageSize: number;
  headerElements: string[];
  sortingFlag: number;

  // @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;
  @Input('tableData') set tableData(data) {
    if (data && Object.keys(data).length) {
      this.tableDetails = data;
      this.headerElements = Object.keys(data[0]);
      this.total = this.tableDetails.length;

    }

  }

  @Input('showableColumn') set showableColumn(data) {
    if (data) {
      this.headerElements = data;
      console.log(data);
    }

  }





  constructor(
              private dataAnalysisService: DataAnalysisService,
  ) {
  }

  ngOnInit(): void {

  }


  onSort(event) {

    if(!this.sortingFlag){
      this.sortingFlag = 1;
      this.getSortedList(event,this.sortingFlag.toString());
      return;
    } if(this.sortingFlag === 1) {
      this.sortingFlag = -1;
      this.getSortedList(event,this.sortingFlag.toString());
      return;
    } if(this.sortingFlag === -1) {
      this.sortingFlag = 1;
      this.getSortedList(event,this.sortingFlag.toString());
      return;
    }

  }

  getSortedList(event,value){
    this.dataAnalysisService.getEmployeeList('getSortedEmployeeData',{'column': event.target.innerText.toLowerCase(),'value': value})
      .subscribe(data => {
        this.tableDetails = data;
        this.total = this.tableDetails.length;

      });


  }

}
