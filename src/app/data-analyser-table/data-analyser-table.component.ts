import {ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-data-analyser-table',
  templateUrl: './data-analyser-table.component.html',
  styleUrls: ['./data-analyser-table.component.css']
})
export class DataAnalyserTableComponent implements OnInit {
  _selectedColumns: any[];
  filteredValues: any[];
  loading: boolean = true;
  cols: any[];
  statusFilter: string[] = [];
  arrayLength: number;
  tableDetails: any[]=[];

  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }
  @Input('tableData') set tableData(data) {
    if (data && Object.keys(data).length) {
      this.tableDetails = data;
    }

  }

  @ViewChild('dt') set dt(dt: any) {
    if(dt != undefined) {
      let filters = dt.filters['status'];
      if (filters != undefined && filters.value != undefined) {
        this.statusFilter = filters.value;
      }
      this.cd.detectChanges();
    }
  }
  onFilter(event, dt){
    this.filteredValues = event.filters;
  }
  set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this.cols.filter(col => val.includes(col));
  }

  constructor(
    private cd: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.loading = false;
    this.cols = [
      { field: 'name', header: 'Name', type: 'text' },
      { field: 'age', header: 'Age' , type: 'number'},
      { field: 'email', header: 'Email', type: 'text' },
      { field: 'salary', header: 'Salary', type: 'number' },

    ];
  }

  showAdvanceFilters(){
    if(this._selectedColumns.length != 0){
      this.arrayLength = this._selectedColumns.length;
    }else {
      this.arrayLength = null;
    }

  }

}
