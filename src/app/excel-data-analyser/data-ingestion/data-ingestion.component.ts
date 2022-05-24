import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FileQueueObject } from './file-upload/file-upload.service';

@Component({
  selector: 'app-data-ingestion',
  templateUrl: './data-ingestion.component.html',
  styleUrls: ['./data-ingestion.component.css']
})
export class DataIngestionComponent implements OnInit {
  name = 'Angular 7 - Example file upload queue';
  path : string;
  disableDataMapping = true;
  onCompleteItem($event) {
    console.log($event);
  }
  constructor(private route: ActivatedRoute,
    ) {
    
   }

  ngOnInit(): void {
    this.path = this.route.snapshot.routeConfig.path;
  }

  isMappClick(event) {
    this.disableDataMapping = event;
  }
}
