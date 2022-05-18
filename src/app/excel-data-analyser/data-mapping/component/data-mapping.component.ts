import { DialogComponent } from './dialog.component';
import { DataMappingService } from '../services/data-mapping.service';
import { Component, OnInit } from '@angular/core';
import IMapperName from '../domain/mapper-name.domain';
import { MatDialog } from '@angular/material/dialog';
import IMapper from '../domain/data-mapping.domain';
import { ActivatedRoute, Router } from '@angular/router';
import IMapperSaved from '../domain/saved-mapper.domain';
import { MatSnackBar } from '@angular/material/snack-bar';
import ITable from '../domain/table-details.domain';


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
  tables: ITable[] = [];
  mappedTableColumns: string[] = [];
  dbColumnList: string[] = [];
  mapperNameList: IMapperName[] = [];
  modelName: string;
  tableName: string;
  mapperName: string;
  mappedContent: string;
  fileId: string;
  fileName: string;

  ngOnInit(): void {

    this.route.queryParams
      .subscribe(params => {
        console.log(params); // { category: "fiction" }
        this.fileId = params["fileId"];
        this.fileName = params["fileName"];
        console.log("File Id "+this.fileId);
      }
    );

    this.getTableList();
    this.path = this.route.snapshot.routeConfig.path;
  }

  getTableList() {
    this.mappingService.getTableList()
      .subscribe(tables => {
        this.tables = tables;
      });
  }

  getMapperNames(collectionName) {
    let queryParam = { "modelName": collectionName };
    this.mappingService.getMapperNames(queryParam)
      .subscribe(fetchedMapperNames => {
        this.mapperNameList = fetchedMapperNames;
      });
  }

  onTableChange(event) {
    let tableName = event.value;
    let schema = event.source.selected.viewValue;
    let queryParam = { "collectionName": schema };
    this.mappingService.getTableColumns(queryParam)
      .subscribe(columns => {
        this.showTable = true;
        this.dbColumnList = columns;
        this.getMapperNames(schema);
        this.getExcelHeaderList();
      });

    this.modelName = schema;
    this.tableName = tableName;
  }

  getExcelHeaderList() {
    let queryParam = { "fileId": this.fileId };
    this.mappingService.getExcelHeaders(queryParam)
      .subscribe(headers => {
        this.excelHeaderList = headers.data;
        this.excelHeaderList.push("");
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
      });
  }

  setMappedColumnsInview(mappedContentStr) {
    let mappecontent = JSON.parse(mappedContentStr);
    this.mappedTableColumns = [];

    Object.keys(mappecontent).forEach((val, key) => {
      let excelHeader = mappecontent[val];
      let dbColumnIndx = this.dbColumnList.indexOf(val);
      this.mappedTableColumns[dbColumnIndx] = excelHeader;
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
          mapperContent["fileId"] = this.fileId;
          this.saveMapping(mapperContent);
        }
      })
    } else {
      // this.mapperName = result;
      this.updateMapping(this.selectedMapperId, mapperContent);
    }
  }

  onViewMapping(mapperContent) {
    let queryParam = { "fileName": this.fileName };
    const dataMap = JSON.stringify(Object.fromEntries(mapperContent.entries()));
    this.mappingService.getExcelDataWithMapping(dataMap, queryParam)
      .subscribe(mappedData => {
        this.showMapperView = true;
        this.tabledata = mappedData.data;
        this.headers = Object.keys(this.tabledata[0]);
      });
  }

  updateMapping(mapperId, mapperContent) {
    const updatedMapper: IMapperSaved = {
      _id: mapperId,
      modelName: this.modelName,
      tableName: this.tableName,
      mapperName: this.mapperName,
      modelContent: JSON.stringify(Object.fromEntries(mapperContent.entries()))
    }

    this.mappingService.updateMapping(updatedMapper)
      .subscribe((updatedMapper) => {
        this.showSuccesMessage();
        this.navigateToDataIngestion();
      });
  }

  showSuccesMessage() {
    this._snackBar.open('Saved Successfully', 'Ok', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: 'my-custom-snackbar'
    })
  }

  saveMapping(mapperContent) {
    const mapper: IMapper = {
      modelName: this.modelName,
      tableName : this.tableName,
      mapperName: this.mapperName,
      modelContent: JSON.stringify(Object.fromEntries(mapperContent.entries())),
      fileId : this.fileId
    }

    this.mappingService.saveMapping(mapper)
      .subscribe((response) => {
        this.showSuccesMessage();
        this.setMapperSelectedAfterSave(response["mapResponse"]);
        this.navigateToDataIngestion();
      });
  }

  setMapperSelectedAfterSave(mapper) {
    let option = { _id: mapper["_id"], mapperName: mapper["mapperName"] };
    this.mapperNameList.push(option);
    this.selectedMapperId = mapper["_id"];
  }

  navigateToDataIngestion() {
    this.router.navigate(['']);
  }

}
