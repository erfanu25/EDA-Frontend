
import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { MenuItem, SelectItem } from "primeng/api";
import { ThemePalette } from "@angular/material/core";
import { DateCriteria, EmpDetails, NumberCriteria, TableType, TextCriteria } from "./domain/data-analysis.domain";
import { DataAnalysisService } from "./service-api/data-analysis.service";
import { Observable } from "rxjs";
import { DataMappingService } from '../data-mapping/services/data-mapping.service';
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
  // cols: any[];
  // statusFilter: string[] = [];
  showFooTable: boolean = true;

  isDataAnlaysis: boolean;
  isDataIngestion: boolean;
  isDataMapping: boolean;
  // _selectedColumns: any[];
  // filteredValues: any[];
  displayCriteriaAddComponents: boolean;
  displayViewColumnSection: boolean;

  users: Array<any>;
  selectAllColumns: boolean;
  columnHeaders: Array<any>;
  permissions: Array<any> = [];
  showableColumn: Array<any>;
  columnToShow: Array<any> = [];

  path: string;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private mappingService: DataMappingService,
    private dataAnalysisService: DataAnalysisService,
  ) { }
  ngOnInit(): void {
    this.loading = false;

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
  }



  fetchEmplyeeList(event) {
    if (event === 'EMPLOYEE') {
      this.dataAnalysisService.getEmployeeList('getEmployeeData')
        .subscribe(data => {
          this.details = data;

        });

      let queryParam = { "collectionName": 'Employee' };
      this.mappingService.getTableColumns(queryParam)
        .subscribe(columns => {
          console.log(columns);
          this.columnHeaders = columns;
          this.columnToShow = columns;
          this.selectAllColumns = true;
          this.checkAllValue();
        });
    }
  }

  selectedCriteria(criteriaViews) {
    console.log(criteriaViews);
  }
  onCriteriaViewClick() {
    this.displayCriteriaAddComponents = true;
  }

  onViewColumnsClick() {
    this.displayViewColumnSection = true;
  }

  checkAllValue() {
    this.columnHeaders.forEach((v, i) => {
      if (this.selectAllColumns) {
        this.permissions[i] = true;
      } else {
        this.permissions[i] = false;
      }
    })
  }

  onApplyColumnsView() {
    this.displayViewColumnSection = false;
    this.showableColumn = [];
    this.columnToShow = [];
    this.columnHeaders.forEach((value, i) => {
      if (this.permissions[i]) {
        this.columnToShow.push(value);
      }
    })

    this.showableColumn = this.columnToShow;
  }


}
