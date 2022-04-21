import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FileData } from "./services/domain/data-ingestion.domain";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-data-ingestion',
  templateUrl: './data-ingestion.component.html',
  styleUrls: ['./data-ingestion.component.css']
})
export class DataIngestionComponent implements OnInit, AfterViewInit {
  fileData: FileData[] = [];
  statuses!: any[];
  representatives!: any[];
  activityValues: number[] = [0, 100];
  totalRecords: number = 5;
  displayedColumns: string[] = ['date', 'fileName', 'status', 'schedule', 'action'];
  dataSource = new MatTableDataSource<FileData>(this.fileData);
  constructor(
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.fileData = [
      { date: '12/02/2022', fileName: 'kiran', status: 'mapped', schedule: '14/12/2021', action: 'Inject Now' },
      { date: '12/02/2022', fileName: 'Galib', status: 'mapped', schedule: '14/12/2021', action: 'Inject Now' },
      { date: '12/02/2022', fileName: 'Habib', status: 'mapped', schedule: '14/12/2021', action: 'Inject Now' },
      { date: '12/02/2022', fileName: 'Erfan', status: 'mapped', schedule: '14/12/2021', action: 'Inject Now' },

    ];


  }

  first = 0;

  rows = 10;




  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  isLastPage(): boolean {
    return this.fileData ? this.first === (this.fileData.length - this.rows) : true;
  }

  isFirstPage(): boolean {
    return this.fileData ? this.first === 0 : true;
  }

  ngAfterViewInit(): void {
  }


  navigateToDataMapping() {
    this.router.navigate(['dataMapping'], { relativeTo: this.route });
  }
  navigateToDataAnalysis() {
    this.router.navigate(['dataAnalysis'], { relativeTo: this.route });
  }
}
