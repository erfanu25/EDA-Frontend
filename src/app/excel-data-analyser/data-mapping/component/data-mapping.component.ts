import { DialogComponent } from './dialog.component';
import { DataMappingService } from '../services/data-mapping.service';
import { Component, OnInit } from '@angular/core';
import IMapperName from '../domain/mapper-name.domain';
import { MatDialog } from '@angular/material/dialog';
import IMapper from '../domain/data-mapping.domain';
import { ActivatedRoute, Router } from '@angular/router';
import IMapperSaved from '../domain/saved-mapper.domain';


@Component({
  selector: 'app-data-mapping',
  templateUrl: './data-mapping.component.html',
  styleUrls: ['../data-mapping.component.css']
})
export class DataMappingComponent implements OnInit {

  constructor(
    private mappingService: DataMappingService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute) {

  }

  path: string;
  dataMaps: any;

  ngOnInit(): void {
<<<<<<< Updated upstream
    this.getTableList();
=======
    this.mappingService.getTableList()
      .subscribe(tables => {
        console.log(tables);
        this.tables = tables;
      });

>>>>>>> Stashed changes
    this.path = this.route.snapshot.routeConfig.path;
  }

  showTable: boolean = false;
  selectedMapperId: string = "customId";
  excelHeaders: string[] = ["Name", "Address", "Age"];
  tables: string[] = [];
  mappedTableColumns: string[] = [];
  dbColumnList: string[] = [];
  mapperNameList: IMapperName[] = [];
  modelName: string;
  mapperName: string;
  mappedContent : string;


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
      });

    this.modelName = event.value;
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
        this.mapperName = result;
        this.saveMapping(mapperContent);
      })
    } else {
     // this.mapperName = result;
      this.updateMapping(this.selectedMapperId, mapperContent);
    }
  }

  updateMapping(mapperId, mapperContent) {
    const updatedMapper: IMapperSaved = {
      _id: mapperId,
      modelName: this.modelName,
      mapperName: this.mapperName,
      modelContent: JSON.stringify(Object.fromEntries(mapperContent.entries()))
    }

    console.log(updatedMapper);

    // this.mappingService.saveMapping(updatedMapper)
    //   .subscribe((updatedMapper) => console.log(updatedMapper));
  }

  saveMapping(mapperContent) {
    const mapper: IMapper = {
      modelName: this.modelName,
      mapperName: this.mapperName,
      modelContent: JSON.stringify(Object.fromEntries(mapperContent.entries()))
    }

    this.mappingService.saveMapping(mapper)
      .subscribe((savedMapper) => console.log(savedMapper));
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
