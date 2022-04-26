import { DataMappingService } from '../services/data-mapping.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { excelHeaders, Mapper, Table, tableListData } from '../domain/tableMapper.domain';
import IMapperName from '../domain/mapper-name.domain';
// import { EventEmitter } from 'stream';


@Component({
  selector: 'table',
  templateUrl: './table.component.html',
  styleUrls: ['../data-mapping.component.css']
})
export class TableComponent implements OnInit {
  //private tableList: string[] = []

  @Input("dbColumns") public  dbColumns: string[] = []; 

  @Output() public saveMappingEvent = new EventEmitter<Map<string,string>>();

  mappedCol: Map<string, string> = new Map<string, string>();


  constructor(private mappingService: DataMappingService) {

  }

  ngOnInit(): void {
    console.log(this.dbColumns);
  
  }



  excelHeaderList: string[] = ["Name", "Address", "Age"];

  mappedTableColumns: string[] = [];

  dropItem(event: CdkDragDrop<string[]>) {
    console.log("current " + event.container);
    console.log("prev " + event.previousContainer);
    console.log("currentInd " + event.currentIndex);
    console.log("prevInd " + event.previousIndex);
    console.log(event.container);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }

    this.populateColumnHeaderMeaping(event);
  }

  populateColumnHeaderMeaping(event: CdkDragDrop<string[]>) {
    let currentIndx = event.currentIndex;
    event.container.data.forEach(((element, indx) => {
      this.mappedCol.set(element, this.excelHeaderList[currentIndx]);
    }));

    console.log("Map data ");
    console.log(this.mappedCol);

  }

  saveMapping() {
    console.log("Map data 2");
    this.saveMappingEvent.emit(this.mappedCol);
  }



  processMapperData(mapperData) {
    this.excelHeaderList = excelHeaders;
    // this.mappedTableColumns = [];
    // if (mapperData) {
    //   this.mappedExcelColumns = [];
    //   mapperData.forEach(element => {
    //     this.mappedExcelColumns.push(element.excelHeader);
    //     this.mappedTableColumns.push(element.tablePropertiesName);
    //   })
    // }
  }




}
