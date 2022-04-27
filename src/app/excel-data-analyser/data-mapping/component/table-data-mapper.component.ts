import { DataMappingService } from '../services/data-mapping.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { excelHeaders } from '../domain/tableMapper.domain';


@Component({
  selector: 'table-data-mapper',
  templateUrl: './table-data-mapper.component.html',
  styleUrls: ['../data-mapping.component.css']
})
export class TableMapperComponent implements OnInit {
  //private tableList: string[] = []

  @Input("dbColumns") public dbColumns: string[] = [];

  @Input("mappedContent") public mappedContent: string;

  @Input("mappedTableColumns") public mappedTableColumns: string[] = [];

  @Output() public saveMappingEvent = new EventEmitter<Map<string, string>>();

  @Output() public removeMappedColumnEvent = new EventEmitter<string>();

  mappedCol: Map<string, string> = new Map<string, string>();

  constructor(private mappingService: DataMappingService) {

  }

  // excelHeaderList: string[] = [];

  ngOnInit(): void {
    console.log("table component");
    console.log(this.mappedContent);
    if (this.mappedContent) {
      this.populateColumnHeaderWithExisting();
    }
  }

  getExcelHeaderList(fileId) {

  }

  populateColumnHeaderWithExisting() {
    let excelHeaderMap = JSON.parse(this.mappedContent);

    Object.values(excelHeaderMap).forEach(keyVal => {
      console.log("key val");
      console.log(keyVal);
    })

  }


  excelHeaderList: string[] = ["Name", "Address", "Age"];

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
      this.mappedCol.set(element, this.excelHeaderList[indx]);
    }));
  }

  saveMapping() {
    console.log("Map data 2");
    console.log(this.mappedCol);
    this.saveMappingEvent.emit(this.mappedCol);
  }

  showMappedTable() {

  }


  removeMappedColumn(tColumn) {
    console.log("Remove");
    console.log(this.mappedCol);
    this.mappedCol.delete(tColumn);
    this.removeMappedColumnEvent.emit(tColumn);
  }


}
