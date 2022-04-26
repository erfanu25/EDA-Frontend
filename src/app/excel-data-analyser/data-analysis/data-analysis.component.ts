
import {ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MenuItem, SelectItem} from "primeng/api";
import {ThemePalette} from "@angular/material/core";
import {DateCriteria, EmpDetails, NumberCriteria, TableType, TextCriteria} from "./domain/data-analysis.domain";
@Component({
  selector: 'app-data-analysis',
  templateUrl: './data-analysis.component.html',
  styleUrls: ['./data-analysis.component.css']
})
export class DataAnalysisComponent implements OnInit {

  value: string;
  items!: MenuItem[];
  activeItem!: MenuItem;
  arrayLength: number;
  tableType: SelectItem[] = TableType;
  textCriteria: SelectItem[] = TextCriteria;
  dateCriteria: SelectItem[] = DateCriteria;
  numberCriteria: SelectItem[] = NumberCriteria;
  details: EmpDetails[]=[];
  loading: boolean = true;
  cols: any[];
  showFooTable: boolean  = true;
  statusFilter: string[] = [];
  isDataAnlaysis: boolean;
  isDataIngestion: boolean;
  isDataMapping: boolean;
  _selectedColumns: any[];

  displayCriteriaAddComponents: boolean;

  filteredValues: any[];
  path: string;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) { }
  ngOnInit(): void {
    this.loading = false;
    this.items = [
      {label: 'Grid Views', icon: 'pi pi-fw pi-th-large'},

      // {label: 'Pivot views', icon: 'pi pi-fw pi-sort-amount-up'},
      // {label: 'Chart Views', icon: 'pi pi-fw pi-chart-bar'},
      // {label: 'Custom Queries', icon: 'pi pi-fw pi-key'}
    ];
    this.activeItem = this.items[0];
   this.details= [
      { name: 'Galib', age: 29,address:'gsdhasdshg' },
      { name: 'Arif', age: 28,address:'gsgs'  },
      { name: 'Rakib', age: 27,address:'gsdtw363hasdshg'  },
      { name: 'Hannan', age: 26,address:'gsdhe455asdshg' },


    ];
    this.cols = [
      { field: 'name', header: 'Name', type: 'text' },
      { field: 'age', header: 'Age' , type: 'number'},
      { field: 'address', header: 'Address', type: 'text' }
    ];
    this.path = this.route.snapshot.routeConfig.path;


    this.path = this.route.snapshot.routeConfig.path;


    this.displayCriteriaAddComponents=false;
  }


  @Input() get selectedColumns(): any[] {
    // this.arrayLength = this._selectedColumns.length;
    return this._selectedColumns;
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

  navigateToDataMapping(){
    this.router.navigate(['dataMapping'], { relativeTo: this.route });
  }
  navigateToDataIngestion(){
    this.router.navigate(['']);
  }
  selectedCriteria(criteriaViews) {
    console.log(criteriaViews);
  }
  onCriteriaViewClick() {
    this.displayCriteriaAddComponents=true;
  }
  showAdvanceFilters(){
    if(this._selectedColumns.length != 0){
      this.arrayLength = this._selectedColumns.length;
    }else {
      this.arrayLength = null;
    }

  }

}
