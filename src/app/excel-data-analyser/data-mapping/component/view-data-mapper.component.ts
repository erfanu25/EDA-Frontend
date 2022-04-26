import { DataMappingService } from '../services/data-mapping.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'view-data-mapper',
  templateUrl: './view-data-mapper.component.html',
  styleUrls: ['../data-mapping.component.css']
})
export class ViewDataMapperComponent implements OnInit {

  @Input("dataMapping") public  dataMapping: any; 

  constructor(private mappingService: DataMappingService) {

  }

  headers: any[];
  tabledata: any[];

  ngOnInit(): void {
    this.dataMapping = { 
        "name": "Name",
        "econtact": "Contact No",
        "gender": "Gender",
        "address": "Address",
        "email": "Email" };
    console.log(this.dataMapping);
    this.getExcelDataWithMap(this.dataMapping);
  }

  getExcelDataWithMap(dataMaps) {
    this.mappingService.getExcelDataWithMapping(dataMaps)
    .subscribe(mappedData => {
      console.log(mappedData.data);
      this.tabledata = mappedData.data;
      this.headers = Object.keys(this.tabledata[0]);

      console.log(this.headers);

    });
  }

}
