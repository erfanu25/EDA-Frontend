import { DialogComponent } from './dialog.component';
import { DataMappingService } from '../services/data-mapping.service';
import { Component, OnInit } from '@angular/core';
import IMapperName from '../domain/mapper-name.domain';
import { MatDialog } from '@angular/material/dialog';
import IMapper from '../domain/data-mapping.domain';
import { ActivatedRoute, Router } from '@angular/router';
import IMapperSaved from '../domain/saved-mapper.domain';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-data-mapping',
  templateUrl: './data-mapping.component.html',
  styleUrls: ['../data-mapping.component.css']
})
export class DataMappingComponent implements OnInit {

  constructor(
    private mappingService: DataMappingService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute) {

  }

  path: string;
  dataMaps: any;
  excelHeaderList: string[] = [];
  tabledata: any[] = [];
  headers: any[] = [];
  showMapperView: boolean = false;



  showTable: boolean = false;
  selectedMapperId: string = "customId";
  excelHeaders: string[] = ["Name", "Address", "Age"];
  tables: string[] = [];
  mappedTableColumns: string[] = [];
  dbColumnList: string[] = [];
  mapperNameList: IMapperName[] = [];
  modelName: string;
  mapperName: string;
  mappedContent: string;

  ngOnInit(): void {
    this.getTableList();
    this.path = this.route.snapshot.routeConfig.path;
  }

  getTableList() {
    this.mappingService.getTableList()
      .subscribe(tables => {
        console.log(tables);
        this.tables = tables;
      });
  }

  getMapperNames(collectionName) {
    let queryParam = { "modelName": collectionName };
    this.mappingService.getMapperNames(queryParam)
      .subscribe(fetchedMapperNames => {
        this.mapperNameList = fetchedMapperNames;
        console.log(this.mapperNameList);
      });
  }

  onTableChange(event) {
    let queryParam = { "collectionName": event.value };
    this.mappingService.getTableColumns(queryParam)
      .subscribe(columns => {
        this.showTable = true;
        this.dbColumnList = columns;
        this.getMapperNames(event.value);
        this.getExcelHeaderList(0);
      });

    this.modelName = event.value;
  }

  getExcelHeaderList(fileId) {
    this.mappingService.getExcelHeaders(fileId)
      .subscribe(headers => {
        this.excelHeaderList = headers.data;
      });
  }


  onMapperSelect(event) {
    let mapperId = event.value;
    this.mapperName = event.source.selected.viewValue;
    let queryParam = { "_id": mapperId };
    this.mappingService.getMapper(queryParam)
      .subscribe(mapper => {
        this.setMappedColumnsInview(mapper["modelContent"]);
        this.mappedContent = mapper["modelContent"];
        console.log("mapped content");
        console.log(this.mappedContent);
      });
  }

  setMappedColumnsInview(mappedContentStr) {
    let mappecontent = JSON.parse(mappedContentStr);
    this.mappedTableColumns = [];

    Object.keys(mappecontent).forEach((val, key) => {
      let excelHeader = mappecontent[val];
      let excelHeaderIndx = this.excelHeaders.indexOf(excelHeader);
      this.mappedTableColumns[excelHeaderIndx] = val;
    });

  }


  onSaveMapping(mapperContent) {
    if (this.selectedMapperId == 'customId') {
      let diaLogRef = this.dialog.open(DialogComponent, {
        data: { mapperName: this.mapperName }
      });
      diaLogRef.afterClosed().subscribe(result => {
        if (result) {
          this.mapperName = result;
          this.saveMapping(mapperContent);
        }
      })
    } else {
      // this.mapperName = result;
      this.updateMapping(this.selectedMapperId, mapperContent);
    }
  }

  onViewMapping(mapperContent) {
    const dataMap = JSON.stringify(Object.fromEntries(mapperContent.entries()));
    this.mappingService.getExcelDataWithMapping(dataMap)
      .subscribe(mappedData => {
        this.showMapperView = true;
        console.log(mappedData.data);
        this.tabledata = mappedData.data;
        this.headers = Object.keys(this.tabledata[0]);
      });
  }

  updateMapping(mapperId, mapperContent) {
    const updatedMapper: IMapperSaved = {
      _id: mapperId,
      modelName: this.modelName,
      mapperName: this.mapperName,
      modelContent: JSON.stringify(Object.fromEntries(mapperContent.entries()))
    }

    console.log(updatedMapper);

    this.mappingService.updateMapping(updatedMapper)
      .subscribe((updatedMapper) => console.log(updatedMapper));
  }

  saveMapping(mapperContent) {
    const mapper: IMapper = {
      modelName: this.modelName,
      mapperName: this.mapperName,
      modelContent: JSON.stringify(Object.fromEntries(mapperContent.entries()))
    }

    this.mappingService.saveMapping(mapper)
      .subscribe((savedMapper) =>
        // console.log(savedMapper)
        this._snackBar.open('Saved Successfully', 'Ok', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
          panelClass: 'my-custom-snackbar'
        })

      );
  }

  removeMappedColumn(columnToRemove) {
    let columnToRemoveIndx = this.mappedTableColumns.indexOf(columnToRemove);
    this.mappedTableColumns.splice(columnToRemoveIndx, 1);
    this.placeInDbColumn(columnToRemove);
  }

  placeInDbColumn(column) {
    let columnIndx = this.dbColumnList.indexOf(column);
    if (columnIndx == -1) {
      this.dbColumnList.push(column);
    }
  }

}
