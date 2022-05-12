import { Component, OnInit } from '@angular/core';
import { FileQueueObject } from './file-upload/file-upload.service';

@Component({
  selector: 'app-data-ingestion',
  templateUrl: './data-ingestion.component.html',
  styleUrls: ['./data-ingestion.component.css']
})
export class DataIngestionComponent implements OnInit {
  name = 'Angular 7 - Example file upload queue';

  onCompleteItem($event) {
    console.log($event);
  }
  constructor() { }

  ngOnInit(): void {
  }

}
