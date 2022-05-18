import { DataMappingService } from '../services/data-mapping.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { excelHeaders } from '../domain/tableMapper.domain';
import { MatSnackBar } from '@angular/material/snack-bar';


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

  constructor(private _snackBar: MatSnackBar) {

  }


  ngOnChanges(changes: SimpleChanges): void {
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
      this.mappedContent.set(mapArr[0], mapArr[1]);
    })

  }

  dropItem(event: CdkDragDrop<string[]>) {
    if (this.dbColumns.length > event.container.data.length) {
      if (event.previousContainer === event.container) {
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      } else {
        transferArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);

          if (!event.container.data[event.currentIndex]) {
            this.excelHeaderList.push('');
          }
      }
      this.populateColumnHeaderMaping(event);
    } else {
      this.showInvalidMsg();
    }

  }

  showInvalidMsg() {
    this._snackBar.open('Invalid Operation', 'Ok', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: 'my-custom-snackbar'
    })
  }

  populateColumnHeaderMaping(event: CdkDragDrop<string[]>) {
    this.mappedContent = new Map<string, string>();
    event.container.data.forEach(((element, indx) => {
      if (element) {
        this.mappedContent.set(this.dbColumns[indx], element);
      }
    }));

  }

  saveMapping() {
    if (this.mappedContent.size > 0) {
      this.saveMappingEvent.emit(this.mappedContent);
    } else {
      this.showInvalidMsg();
    }
  }

  showMappedTable() {
    this.viewMapperEvent.emit(this.mappedContent);
  }


  removeMappedColumn(columnToRemove, index) {
    let dbColumnToRemove = this.dbColumns[index];
    this.mappedContent.delete(dbColumnToRemove);
    //this.dbColumns.push(this.dbColumns.splice(index, 1)[0]);
    this.mappedTableColumns.splice(index, 1);
    this.placeInDbColumn(columnToRemove);
  }

  placeInDbColumn(column) {
    let columnIndx = this.excelHeaderList.indexOf(column);
    if (columnIndx == -1 && column) {
      this.excelHeaderList.push(column);
    }
  }


}
