
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { MenuItem, SelectItem } from "primeng/api";
import { DateCriteria, EmpDetails, NumberCriteria, TableType, TextCriteria } from "./domain/data-analysis.domain";
import { DataAnalysisService } from "./service-api/data-analysis.service";
import { DataMappingService } from '../data-mapping/services/data-mapping.service';
// import * as XLSX from "xlsx";
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import { LabelType, Options } from '@angular-slider/ngx-slider';
import { AnalysisHttpHandler } from './service-api/analysis-http.handler';
import {TabViewModule} from 'primeng/tabview';

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
  details: EmpDetails[];
  loading: boolean = true;
  showFooTable: boolean = true;
  criteriaViews: any;
  isDataAnlaysis: boolean;
  isDataIngestion: boolean;
  isDataMapping: boolean;
  displayCriteriaAddComponents: boolean;
  displayAdvanceFiltersComponents: boolean;

  displayViewColumnSection: boolean;

  users: Array<any>;
  selectAllColumns: boolean;
  columnHeaders: Array<any>;
  permissions: Array<any> = [];
  showableColumn: Array<any>;
  columnToShow: Array<any> = [];
  tableName: string;
  columnWithTypes: any = [];
  payloadFiltersList:any
  activeIndex:Number;


  path: string;
  constructor(
    private analysisHttpService: AnalysisHttpHandler,
    private router: Router,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private mappingService: DataMappingService,
    private dataAnalysisService: DataAnalysisService,
  ) {
   }
  ngOnInit(): void {
    this.loading = false;
    this.tableName = "";

    this.users = [
      { id: 1, name: 'Sam', permission: [] },
      { id: 2, name: 'Adam', permission: [] },
      { id: 3, name: 'Chris', permission: [] }
    ]

    this.items = [
      { label: 'Grid Views', icon: 'pi pi-fw pi-th-large' },

      // {label: 'Pivot views', icon: 'pi pi-fw pi-sort-amount-up'},
      // {label: 'Chart Views', icon: 'pi pi-fw pi-chart-bar'},
      // {label: 'Custom Queries', icon: 'pi pi-fw pi-key'}
    ];
    this.activeItem = this.items[0];


    this.path = this.route.snapshot.routeConfig.path;


    this.path = this.route.snapshot.routeConfig.path;


    this.displayCriteriaAddComponents = false;
    this.activeIndex=0;

    
  }
  fetchList(event) {
    if (event === 'EMPLOYEE') {
      this.tableName = 'EMPLOYEE';
    }
    if (event === 'COMPANY') {
      this.tableName = 'COMPANY';
    }
    this.GetCriteriaList();

  }
  GetCriteriaList() {
    this.analysisHttpService.get(`GetCriteriaView`).subscribe(data => {
      this.criteriaViews=data;
    }, err => {
      console.log(err);
    })
  }
  handleClose(e) {
    var obj=this.criteriaViews[e.index-1];
    this.analysisHttpService.get(`deleteCriteriaView?id=`+obj._id).subscribe(data => {
      alert("Delete Successfully");
      e.close();
    }, err => {
      console.log(err);
    })
  }
}
