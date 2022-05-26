import { WebSocketService } from './../websocket.service';
import { FileContentServiceService } from './../file-content-service.service';
import { FileContentListApiReqParam } from './../model/file-content-list-api-req-param';
import { FileContentDatasource } from './../file-content-datasource';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, OnInit, Component, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, Observable, merge, fromEvent } from 'rxjs';
import { tap } from 'rxjs/operators';


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

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Output() isMappClick = new EventEmitter<boolean>();
  isInjectionLoading = false

  ngOnInit() {
    this.dataSource = new FileContentDatasource(this.fileContentService);
    this.requestParam = { pageIndex: 0, pageSize: 5 }
    this.dataSource.loadFileContents(this.requestParam);
  }

  constructor(private _httpClient: HttpClient, private router: Router,
    private fileContentService: FileContentServiceService,
    private webSocketService: WebSocketService) {

  }
  
  ngAfterViewInit() {
    this.webSocketService.connect();
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
    this.dataSource.updateLoadingStatus(fileId);
    this.fileContentService.injectFile(fileId)
      .subscribe(taskObj => {
        let fileTask = { "fileId": fileId, "taskId": taskObj["taskId"] }
        this.webSocketService.sendMessage(fileTask);
        this.webSocketService.socket$
          .asObservable()
          .subscribe(injectionStatus => {
            console.log("socket data");
            console.log(injectionStatus);
            this.dataSource.filterDataSourceByFileId(fileId, injectionStatus);
          })
        //this.updateStatus(fileId);
      });
  }

  private updateStatus(fileId, injectionStatus) {
    this.webSocketService.socket$
      .asObservable()
      .subscribe(data => {
        console.log("socket data");
        console.log(data);
        this.dataSource.filterDataSourceByFileId(fileId, injectionStatus);
      })

  }

  navigateToDataMapping(fileId, fileName) {
    this.router.navigate(['../dataMapping'], { queryParams: { fileId: fileId, fileName: fileName } })
    this.isMappClick.emit(false);
  }


}

