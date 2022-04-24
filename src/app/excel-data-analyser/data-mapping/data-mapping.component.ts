import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { companyMapper, companyTableProperties, employeeMapper, empTableProperties, excelHeaders, Mapper, Table, tableListData } from './services/domain/tableMapper.domain';
import {ActivatedRoute} from "@angular/router";

export interface PeriodicElement {
    name: string;
    address: string;
    age: number;
  }

  const ELEMENT_DATA: PeriodicElement[] = [
    {name: 'Erfan', address: 'Dhaka', age: 25},
    {name: 'Iftekhar', address: 'Dhaka', age: 30},
    {name: 'Atiqur', address: 'Dhaka', age: 30},
    {name: 'Istiaq', address: 'Dhaka', age: 30},
    {name: 'Galib', address: 'Dhaka', age: 30},
  ];

@Component({
  selector: 'app-data-mapping',
  templateUrl: './data-mapping.component.html',
  styleUrls: ['./data-mapping.component.css']
})
export class DataMappingComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  showTable: boolean;
  displayDialog: boolean;

  displayedColumns: string[] = ['name', 'address', 'age'];
  dataSource = ELEMENT_DATA;
  path: string;

  tables: Table[] = tableListData;

  mappers: Mapper[] = [{id: 0, name: 'Custom Mapper'}];

  selectedElement: string = "Ca";
  selectedElementControl = new FormControl();

  selectedElementGroup: string[] = [];

  mappedExcelColumns = []

  mappedTableColumns = [];

  remainigTableColumns = [];


  ngOnInit(): void {
    this.path = this.route.snapshot.routeConfig.path;
  }

  reorderList(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.mappedTableColumns, event.previousIndex, event.currentIndex);
  }

  dropItem(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  onTableChange(event) {
    this.showTable = false;
     this.mappers = [{id: 0, name: 'Custom Mapper'}].concat(event.mapper);
     if (event.id === 1) {
       this.remainigTableColumns = companyTableProperties;
     } else if (event.id === 2) {
      this.remainigTableColumns = empTableProperties;
     } else {
      this.remainigTableColumns = [];
     }
  }

  onMapperSelect(event) {
    this.showTable = false;
    if (event.id === 3) {
      this.processMapperData(employeeMapper);
    } else if (event.id === 1) {
      this.processMapperData(companyMapper);
    } else {
      this.processMapperData(null);
    }
  }

  processMapperData(mapperData) {
    this.mappedExcelColumns = excelHeaders;
    this.mappedTableColumns = [];
    if (mapperData) {
      this.mappedExcelColumns = [];
      mapperData.forEach(element =>{
        this.mappedExcelColumns.push(element.excelHeader);
        this.mappedTableColumns.push(element.tablePropertiesName);
      })
    }
  }

  showMappedTable() {
    this.showTable = true;
  }

  showDialog() {
    this.displayDialog = true;
  }


}
