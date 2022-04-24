import {ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MenuItem, SelectItem} from "primeng/api";
import {ThemePalette} from "@angular/material/core";
import {EmpDetails, TableType} from "./domain/data-analysis.domain";

@Component({
  selector: 'app-data-analysis',
  templateUrl: './data-analysis.component.html',
  styleUrls: ['./data-analysis.component.css']
})
export class DataAnalysisComponent implements OnInit {

  value!: any;
  items!: MenuItem[];
  activeItem!: MenuItem;
  tableType: SelectItem[] = TableType;
  details: EmpDetails[]=[];
  loading: boolean = true;
  cols: any[];
  showFooTable: boolean  = true;
  statusFilter: string[] = [];
  isDataAnlaysis: boolean;
  isDataIngestion: boolean;
  isDataMapping: boolean;
  _selectedColumns: any[];
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
      { name: 'Galib', age: 29,address:'gsdhasdshg', email: 'abcd&nnnc.com' },
      { name: 'Arif', age: 28,address:'gsgs' , email: 'sfsf&nnnc.com' },
      { name: 'Rakib', age: 27,address:'gsdtw363hasdshg' , email: 'uyuf&nnnc.com' },
      { name: 'Hannan', age: 26,address:'gsdhe455asdshg' , email: 'abacd&nnnadfc.com' },


    ];
    this.cols = [
      { field: 'name', header: 'Name' },
      { field: 'age', header: 'Age' },
      { field: 'address', header: 'Address' },
      { field: 'email', header: 'Email' }
    ];
    this.path = this.route.snapshot.routeConfig.path;


  }


  @Input() get selectedColumns(): any[] {
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

  // navigateToDataMapping(){
  //   this.router.navigate(['dataMapping'], { relativeTo: this.route });
  // }
  // navigateToDataIngestion(){
  //   this.router.navigate(['']);
  // }

}
