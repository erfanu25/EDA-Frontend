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




interface SearchResult {
  employees: EmpDetails[];
  total: number;
}
interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
}
const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

function sort(tableDetails: EmpDetails[], column: SortColumn, direction: string): any[] {
  if (direction === '' || column === '') {
    return tableDetails;
  } else {
    return [...tableDetails].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function   matches(employee: EmpDetails, term: string, pipe: PipeTransform) {
  return employee.name.toLowerCase().includes(term.toLowerCase())
    || pipe.transform(employee.email).includes(term)
    || pipe.transform(employee.salary).includes(term);
}

@Component({
  selector: 'app-data-analyser-table',
  templateUrl: './data-analyser-table.component.html',
  styleUrls: ['./data-analyser-table.component.css']
})
export class DataAnalyserTableComponent implements OnInit {
  tableDetails: EmpDetails[];
  employees$: Observable<EmpDetails[]>;
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _employees$ = new BehaviorSubject<EmpDetails[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  @Input('tableData') set tableData(data) {
    if (data && Object.keys(data).length) {
      this.tableDetails = data;
      this.employees$ = data;
    }

  }

  private _state: State = {
    page: 1,
    pageSize: 4,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };


  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;



  constructor(
    private cd: ChangeDetectorRef,
    private pipe: DecimalPipe
  ) {
    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._employees$.next(result.employees);
      this._total$.next(result.total);
    });

    this._search$.next();
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

  }





  get employee() { return this._employees$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }

  set page(page: number) { this._set({page}); }
  set pageSize(pageSize: number) { this._set({pageSize}); }
  set searchTerm(searchTerm: string) { this._set({searchTerm}); }
  set sortColumn(sortColumn: SortColumn) { this._set({sortColumn}); }
  set sortDirection(sortDirection: SortDirection) { this._set({sortDirection}); }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchResult> {
    const {sortColumn, sortDirection, pageSize, page, searchTerm} = this._state;

    // 1. sort
    let employees = sort(this.tableDetails, sortColumn, sortDirection);
  if(employees){
    // 2. filter
    employees = employees.filter(employee => matches(employee, searchTerm, this.pipe));
    const total = employees.length;

    // 3. paginate
    employees = employees.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({employees, total});
  }
return of();
  }

}
