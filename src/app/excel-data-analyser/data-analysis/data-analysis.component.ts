
import {ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MenuItem, SelectItem} from "primeng/api";
import {ThemePalette} from "@angular/material/core";
import {DateCriteria, EmpDetails, NumberCriteria, TableType, TextCriteria} from "./domain/data-analysis.domain";
import {DataAnalysisService} from "./service-api/data-analysis.service";
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
  details: unknown=[];
  loading: boolean = true;
  // cols: any[];
  // statusFilter: string[] = [];
  showFooTable: boolean  = true;

  isDataAnlaysis: boolean;
  isDataIngestion: boolean;
  isDataMapping: boolean;
  // _selectedColumns: any[];
  // filteredValues: any[];
  displayCriteriaAddComponents: boolean;


  path: string;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private dataAnalysisService: DataAnalysisService,
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

    // this.fetchEmplyeeList();
    // this.cols = [
    //   { field: 'name', header: 'Name', type: 'text' },
    //   { field: 'age', header: 'Age' , type: 'number'},
    //   { field: 'email', header: 'Email', type: 'text' },
    //   { field: 'salary', header: 'Salary', type: 'number' },
    //
    // ];
    this.path = this.route.snapshot.routeConfig.path;


    this.path = this.route.snapshot.routeConfig.path;


    this.displayCriteriaAddComponents=false;
  }

  //
  // @Input() get selectedColumns(): any[] {
  //   return this._selectedColumns;
  // }


  // @ViewChild('dt') set dt(dt: any) {
  //   if(dt != undefined) {
  //     let filters = dt.filters['status'];
  //     if (filters != undefined && filters.value != undefined) {
  //       this.statusFilter = filters.value;
  //     }
  //     this.cd.detectChanges();
  //   }
  // }
  // onFilter(event, dt){
  //   this.filteredValues = event.filters;
  // }
  // set selectedColumns(val: any[]) {
  //   //restore original order
  //   this._selectedColumns = this.cols.filter(col => val.includes(col));
  // }

  fetchEmplyeeList(event){
    if(event  === 'EMPLOYEE') {
      this.dataAnalysisService.getStudentList('getStudentData')
        .subscribe(data => {
          this.details = data;
        });
    }
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
  // showAdvanceFilters(){
  //   if(this._selectedColumns.length != 0){
  //     this.arrayLength = this._selectedColumns.length;
  //   }else {
  //     this.arrayLength = null;
  //   }
  //
  // }

}
