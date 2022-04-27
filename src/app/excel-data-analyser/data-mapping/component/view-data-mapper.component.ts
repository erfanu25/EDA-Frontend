import { DataMappingService } from '../services/data-mapping.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'view-data-mapper',
  templateUrl: './view-data-mapper.component.html',
  styleUrls: ['../data-mapping.component.css']
})
export class ViewDataMapperComponent implements OnInit {

  @Input("headers") public  headers: any[];
  @Input("tabledata") public  tabledata: any[]; 

  constructor(private mappingService: DataMappingService) {

  }

  ngOnInit(): void {
    
  }


}
