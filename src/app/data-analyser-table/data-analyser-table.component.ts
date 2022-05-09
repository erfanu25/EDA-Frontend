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
import {NgbdSortableHeader, SortColumn, SortDirection, SortEvent} from "./sortable.directives";
import {DecimalPipe} from "@angular/common";
import {debounceTime, delay, switchMap, tap} from "rxjs/operators";
import {TableService} from "./service/data-analyser-table.service";






@Component({
  selector: 'app-data-analyser-table',
  templateUrl: './data-analyser-table.component.html',
  styleUrls: ['./data-analyser-table.component.css'],
  providers: [TableService, DecimalPipe]
})
export class DataAnalyserTableComponent implements OnInit {
  tableDetails: EmpDetails[];
  employee$: Observable<EmpDetails[]>;
  total$: Observable<number>;

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;
  @Input('tableData') set tableData(data) {
    if (data && Object.keys(data).length) {
      this.tableDetails = data;
      this.employee$ = data;
    }

  }





  constructor(public service: TableService
  ) {
    this.employee$ = service.employee;
    this.total$ = service.total$;
    this.tableDetails = service.tableDetails;
  }

  ngOnInit(): void {

  }


  onSort({column, direction}: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });
    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }

}
