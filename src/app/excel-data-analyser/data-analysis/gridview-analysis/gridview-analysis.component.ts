import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { DataMappingService } from '../../data-mapping/services/data-mapping.service';
import { DateCriteria, EmpDetails, NumberCriteria, TableType, TextCriteria } from '../domain/data-analysis.domain';
import { DataAnalysisService } from '../service-api/data-analysis.service';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import { LabelType, Options } from '@angular-slider/ngx-slider';

@Component({
  selector: 'app-gridview-analysis',
  templateUrl: './gridview-analysis.component.html',
  styleUrls: ['./gridview-analysis.component.css']
})
export class GridviewAnalysisComponent implements OnInit {
  value: string;
  arrayLength: number;
  tableType: SelectItem[] = TableType;
  textCriteria: SelectItem[] = TextCriteria;
  dateCriteria: SelectItem[] = DateCriteria;
  numberCriteria: SelectItem[] = NumberCriteria;
  details: EmpDetails[];
  loading: boolean = true;
  showFooTable: boolean = true;

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
  criteriaPayload:any;
  criteriaQuery:any;

  
  @Input('tableName') set setTableName(data) {
    if (data) {
      this.tableName = data;
      debugger;
      this.fetchList();
      console.log(this.tableName);
    }
  }
 
  ngOnChanges() {
    /**********THIS FUNCTION WILL TRIGGER WHEN PARENT COMPONENT UPDATES 'someInput'**************/
     this.fetchList();
     this.GetColumnsWithTypes();

  } 
     
  @Input('criteriaContent') set setCriteriaContentAndPayload(data) {
    if (data) {
      var content=JSON.parse(data);
      this.criteriaPayload=content.payload;
      this.criteriaQuery=content.query;
      this.payloadFiltersList=this.criteriaPayload;
    }
  }

  constructor(private router: Router,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private mappingService: DataMappingService,
    private dataAnalysisService: DataAnalysisService,) { }

  ngOnInit(): void {
    this.GetColumnsWithTypes();
    this.fetchList();
  }
  fetchList() {
    let queryParam = {};
    if (this.tableName == 'EMPLOYEE') {
      queryParam = { "collectionName": 'Employee' };
    }
    if (this.tableName === 'COMPANY') {
      queryParam = { "collectionName": 'Company' };
    }
    this.mappingService.getTableColumns(queryParam)
      .subscribe(columns => {
        this.columnHeaders = columns;
        this.columnToShow = columns;
        this.selectAllColumns = true;
        this.showableColumn = columns;
        this.checkAllValue();
      });
  }

  selectedCriteria(criteriaViews) {
  }
  onCriteriaViewClick() {
    this.displayCriteriaAddComponents = true;
  }
  onViewColumnsClick() {
    this.displayViewColumnSection = !this.displayViewColumnSection;
    this.displayAdvanceFiltersComponents = false;
    let queryParam = {};
    if (this.showableColumn == null) {
      if (this.tableName === 'EMPLOYEE') {
        queryParam = { "collectionName": 'Employee' };
      }
      if (this.tableName === 'COMPANY') {
        queryParam = { "collectionName": 'Company' };
      }
      this.mappingService.getTableColumns(queryParam).subscribe(columns => {
        this.columnHeaders = columns;
        this.columnToShow = columns;
        this.selectAllColumns = true;
        this.showableColumn = columns;
        this.checkAllValue();
      });
    }
  }

  onAdvanceFiltersClick() {
    this.displayAdvanceFiltersComponents = !this.displayAdvanceFiltersComponents;
    this.displayViewColumnSection = false;
    this.GetColumnsWithTypes();
  }
  GetColumnsWithTypes() {
    let queryParam = {};
    if (this.tableName === 'EMPLOYEE') {
      queryParam = { "collectionName": 'Employee' };
    }
    if (this.tableName === 'COMPANY') {
      queryParam = { "collectionName": 'Company' };
    }
    this.mappingService.GetColumnsWithTypes(queryParam)
      .subscribe(columns => {
        this.columnWithTypes=columns;
    });
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

  checkSingleColumn() {
    this.selectAllColumns = false;
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
  updatedFilterList(obj) {
    this.payloadFiltersList=[];
    this.payloadFiltersList = [...obj];
  }

  onExportDataClick() {

    var query = ``;
    if (this.tableName === "EMPLOYEE") {
      query = `getList?modelName=Employee&sortBy=name&sortType=-1&pageIndex=1&pageSize=1000000`;
    }
    this.dataAnalysisService.getList(query,{})
      .subscribe(data => {
        this.details = data.data;
        this.exportExel();
      });
  }
  exportExel() {
    var Header = this.showableColumn.map((name) => {
      return name[0].toUpperCase() + name.slice(1)
    });
    var showableColumnData = JSON.parse(JSON.stringify(this.details, this.showableColumn));

    var dataForExcel = [];
    showableColumnData.forEach((row: any) => {
      dataForExcel.push(Object.values(row))
    })


    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Sheet1');

    let headerRow = worksheet.addRow(Header);
    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '4167B8' },
        bgColor: { argb: '' }
      }
      cell.font = {
        bold: true,
        color: { argb: 'FFFFFF' },
        size: 12
      }
    })

    dataForExcel.forEach(d => {
      worksheet.addRow(d);
    }
    );

    worksheet.columns.forEach(column => {
      const lengths = column.values.map(v => v.toString().length);
      const maxLength = Math.max(...lengths.filter(v => typeof v === 'number')) + 2;
      column.width = maxLength;
    });

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'DataSheet_' + new Date().toLocaleString() + '.xlsx');
    })
  }

}
