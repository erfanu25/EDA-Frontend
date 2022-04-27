import { DataMappingService } from '../services/data-mapping.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { excelHeaders } from '../domain/tableMapper.domain';


@Component({
  selector: 'table-data-mapper',
  templateUrl: './table-data-mapper.component.html',
  styleUrls: ['../data-mapping.component.css']
})
export class TableMapperComponent implements OnInit, OnChanges {

  @Input("dbColumns") public dbColumns: string[] = [];

  @Input("excelHeaders") public excelHeaderList: string[] = [];

  @Input("mappedContent") public mappedContentStr: string;

  @Input("mappedTableColumns") public mappedTableColumns: string[] = [];

  @Output() public saveMappingEvent = new EventEmitter<Map<string, string>>();

  @Output() public viewMapperEvent = new EventEmitter<Map<string, string>>();

 // @Output() public removeMappedColumnEvent = new EventEmitter<string>();

  mappedContent: Map<string, string> = new Map<string, string>();

  constructor(private mappingService: DataMappingService) {

  }


  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    if (this.mappedContentStr) {
      this.populateColumnHeaderWithExisting();
    }
  }


  ngOnInit(): void {

  }

  getExcelHeaderList(fileId) {

  }

  populateColumnHeaderWithExisting() {
    let excelHeaderMap = JSON.parse(this.mappedContentStr);

    Object.entries(excelHeaderMap).forEach((value, indx) => {
      let mapArr: string[] = value.toString().split(",");
      console.log(mapArr[0] + " " + mapArr[1]);
      this.mappedContent.set(mapArr[0], mapArr[1]);
    })

  }

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

    this.populateColumnHeaderMaping(event);
  }

  populateColumnHeaderMaping(event: CdkDragDrop<string[]>) {
    event.container.data.forEach(((element, indx) => {
      this.mappedContent.set(this.dbColumns[indx], element);
    }));

  }

  saveMapping() {
    this.saveMappingEvent.emit(this.mappedContent);
  }

  showMappedTable() {
    this.viewMapperEvent.emit(this.mappedContent);
  }


  removeMappedColumn(columnToRemove,index) {
    console.log("Remove");
    let dbColumnToRemove = this.dbColumns[index];
    console.log(dbColumnToRemove);
    this.mappedContent.delete(dbColumnToRemove);
    console.log(this.mappedContent);

    //let columnToRemoveIndx = this.mappedTableColumns.indexOf(columnToRemove);
    this.mappedTableColumns.splice(index, 1);
    this.placeInDbColumn(columnToRemove);
    //this.removeMappedColumnEvent.emit(tColumn);
  }

  placeInDbColumn(column) {
    let columnIndx = this.excelHeaderList.indexOf(column);
    if (columnIndx == -1) {
      this.excelHeaderList.push(column);
    }
  }


}
