import { FileContentServiceService } from './../file-content-service.service';
import { FileContentListApiReqParam } from './../model/file-content-list-api-req-param';
import { FileContentDatasource } from './../file-content-datasource';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, OnInit, Component, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, Observable, merge, fromEvent } from 'rxjs';
import { tap } from 'rxjs/operators';
import { WebSocketSubject } from 'rxjs/observable/dom/WebSocketSubject';

export class Message {
  constructor(
      public sender: string,
      public content: string,
      public isBroadcast = false,
  ) { }
}
@Component({
  selector: 'file-content-list',
  templateUrl: './file-content-list.component.html',
  styleUrls: ['./file-content-list.component.css']
})
export class FileContentListComponent implements OnInit {

  public destroyed = new Subject<any>();

  displayedColumns: string[] = ['date', 'fileName', 'status', 'schedule', 'action'];
  dataSource: FileContentDatasource;
  isLoadingResults = false;
  isRateLimitReached = false;
  requestParam: FileContentListApiReqParam = {} as FileContentListApiReqParam;
  private socket$: WebSocketSubject<Message>;

  @ViewChild(MatPaginator) paginator: MatPaginator;


  ngOnInit() {
    this.dataSource = new FileContentDatasource(this.fileContentService);
    this.requestParam = { pageIndex: 0, pageSize: 5 }
    this.dataSource.loadFileContents(this.requestParam);
  }

  constructor(private _httpClient: HttpClient, private router: Router,
    private fileContentService: FileContentServiceService,
    private route: ActivatedRoute) {

      this.socket$ = new WebSocketSubject('ws://localhost:8999');

        this.socket$
            .subscribe(
            (message) => console.log(message),
            (err) => console.error(err),
            () => console.warn('Completed!')
            );
  }
  ngAfterViewInit() {
    this.paginator.page
      .pipe(
        tap(() => this.loadListPage())
      )
      .subscribe();
  }

  private loadListPage() {
    console.log(this.paginator.pageIndex + " : size " + this.paginator.pageSize)
    this.requestParam.pageIndex = this.paginator.pageIndex;
    this.requestParam.pageSize = this.paginator.pageSize;
    this.dataSource.loadFileContents(this.requestParam);
  }

  public injectFile(fileId) {
    console.log(fileId);
    this.fileContentService.injectFile(fileId)
      .subscribe(data => console.log(data));
  }

  navigateToDataMapping(fileId, fileName) {
    //this.router.navigate(['../dataMapping'], { relativeTo: this.route });
    this.router.navigate(['../dataMapping'], { queryParams: { fileId: fileId, fileName: fileName } })
  }


}

