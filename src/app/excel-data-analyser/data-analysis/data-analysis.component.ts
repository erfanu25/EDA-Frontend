
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


    this.path = this.route.snapshot.routeConfig.path;


    this.path = this.route.snapshot.routeConfig.path;


    this.displayCriteriaAddComponents=false;
  }



  fetchEmplyeeList(event){
    if(event  === 'EMPLOYEE') {
      this.dataAnalysisService.getStudentList('getStudentData')
        .subscribe(data => {
          this.details = data;
        });
    }
  }

  selectedCriteria(criteriaViews) {
    console.log(criteriaViews);
  }
  onCriteriaViewClick() {
    this.displayCriteriaAddComponents=true;
  }


}
