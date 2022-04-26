import { DialogComponent } from './dialog.component';
import { DataMappingService } from '../services/data-mapping.service';
import { Component, OnInit } from '@angular/core';
import IMapperName from '../domain/mapper-name.domain';
import { MatDialog } from '@angular/material/dialog';
import IMapper from '../domain/data-mapping.domain';
import { ActivatedRoute, Router } from '@angular/router';


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

  ngOnInit(): void {
    this.mappingService.getTableList()
      .subscribe(tables => {
        console.log(tables);
        this.tables = tables;
      });

      this.path = this.route.snapshot.routeConfig.path;
  }

  showTable: boolean = false;
  selectedMapperId: string = "customId";
  tables: string[] = [];
  dbColumnList: string[] = [];
  mapperNameList: IMapperName[] = [];
  modelName: string;
  mapperName: string;


  getMapperNames(collectionName) {
    let queryParam = { "modelName": collectionName };
    this.mappingService.getMapperNames(queryParam)
      .subscribe(fetchedMapperNames => {
        this.mapperNameList = fetchedMapperNames;
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

  onSaveMapping(modelContent) {
    if (this.selectedMapperId == 'customId') {
      let diaLogRef = this.dialog.open(DialogComponent, {
        data: { mapperName: this.mapperName }
      });
      diaLogRef.afterClosed().subscribe(result => {
        this.mapperName = result;
        this.saveMapping(modelContent);
      })
    }
  }

  saveMapping(event) {
    const mapper: IMapper = {
      modelName: this.modelName,
      mapperName: this.mapperName,
      modelContent: JSON.stringify(Object.fromEntries(event.entries()))
    }

    console.log(mapper);

    this.mappingService.saveMapping(mapper)
      .subscribe((savedMapper) => console.log(savedMapper));
  }



  onMapperSelect(event) {

    this.mapperName = event.target.options[event.target.options.selectedIndex].text;
    console.log("Model name " + this.mapperName);

    //   this.showTable = false;
    //   if (event.id === 3) {
    //     this.processMapperData(employeeMapper);
    //   } else if (event.id === 1) {
    //     this.processMapperData(companyMapper);
    //   } else {
    //     this.processMapperData(null);
    //   }
  }

  // processMapperData(mapperData) {
  //   this.mappedExcelColumns = excelHeaders;
  //   this.mappedTableColumns = [];
  //   if (mapperData) {
  //     this.mappedExcelColumns = [];
  //     mapperData.forEach(element => {
  //       this.mappedExcelColumns.push(element.excelHeader);
  //       this.mappedTableColumns.push(element.tablePropertiesName);
  //     })
  //   }
  // }

  // showMappedTable() {
  //   this.showTable = true;
  // }

  // showDialog() {
  //   this.displayDialog = true;
  // }


}
