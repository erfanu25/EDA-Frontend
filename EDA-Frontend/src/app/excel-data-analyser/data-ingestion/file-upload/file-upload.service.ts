import { FileContent } from './../file-content/model/file-content';
import * as _ from 'lodash';

import { HttpClient, HttpErrorResponse, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Subscription, Observable } from 'rxjs';
import { HttpEventType } from '@angular/common/http';
import 'rxjs/add/observable/interval';

export enum FileQueueStatus {
  Pending,
  Success,
  Error,
  Progress
}

export class FileQueueObject {
  public file: any;
  public status: FileQueueStatus = FileQueueStatus.Pending;
  public progress: number = 0;
  public request: Subscription = null;
  public taskStatus : Subscription = null;
  public response: HttpResponse<any> | HttpErrorResponse = null;

  constructor(file: any) {
    this.file = file;
  }

  // actions
  public upload = () => { /* set in service */ };
  public cancel = () => { /* set in service */ };
  public remove = () => { /* set in service */ };

  // statuses
  public isPending = () => this.status === FileQueueStatus.Pending;
  public isSuccess = () => this.status === FileQueueStatus.Success;
  public isError = () => this.status === FileQueueStatus.Error;
  public inProgress = () => this.status === FileQueueStatus.Progress;
  public isUploadable = () => this.status === FileQueueStatus.Pending || this.status === FileQueueStatus.Error;

}

// tslint:disable-next-line:max-classes-per-file
@Injectable({
  providedIn: 'root'
})
@Injectable()
export class FileUploadService {

  // public url: string = 'https://jsonplaceholder.typicode.com/posts';
  public url: string = 'http://127.0.0.1:8000/api/process';
  

  private _queue: BehaviorSubject<FileQueueObject[]>;
  private _files: FileQueueObject[] = [];
  sub: Subscription;

  constructor(private http: HttpClient) {
    this._queue = <BehaviorSubject<FileQueueObject[]>>new BehaviorSubject(this._files);
  }

  // the queue
  public get queue() {
    return this._queue.asObservable();
  }

  // public events
  public onCompleteItem(queueObj: FileQueueObject, response: any): any {
    return { queueObj, response };
  }

  // public functions
  public addToQueue(data: any) {
    // add file to the queue
    _.each(data, (file: any) => this._addToQueue(file));
  }

  public clearQueue() {
    // clear the queue
    this._files = [];
    this._queue.next(this._files);
  }

  public uploadAll() {
    // upload all except already successfull or in progress
    _.each(this._files, (queueObj: FileQueueObject) => {
      if (queueObj.isUploadable()) {
        this._upload(queueObj);
      }
    });
  }

  // private functions
  private _addToQueue(file: any) {
    const queueObj = new FileQueueObject(file);

    // set the individual object events
    queueObj.upload = () => this._upload(queueObj);
    queueObj.remove = () => this._removeFromQueue(queueObj);
    queueObj.cancel = () => this._cancel(queueObj);

    // push to the queue
    this._files.push(queueObj);
    this._queue.next(this._files);
  }

  private _removeFromQueue(queueObj: FileQueueObject) {
    _.remove(this._files, queueObj);
  }


  private _upload(queueObj: FileQueueObject) {
    // create form data for file
    const form = new FormData();
    form.append('files', queueObj.file, queueObj.file.name);
    
    // upload file and report progress
    const req = new HttpRequest('POST', this.url, form, {
      reportProgress: true,
    });

    // upload file and report progress
    queueObj.request = this.http.request(req).subscribe(
      (event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          console.log("hello progress")
          this._uploadProgress(queueObj, event);
          
        } else if (event instanceof HttpResponse) {
          console.log("interval happening")
          queueObj.taskStatus = Observable.interval(10000)
               .subscribe((val) => {
                this._getTaskStatus(queueObj,event);
               });
               
        }
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          this._uploadFailed(queueObj, err);
        } else {
          // The backend returned an unsuccessful response code.
          this._uploadFailed(queueObj, err);
        }
      }
    );
    console.log("file upload complete " + queueObj)

    return queueObj;
  }

  private _cancel(queueObj: FileQueueObject) {
    // update the FileQueueObject as cancelled
    queueObj.request.unsubscribe();
    queueObj.progress = 0;
    queueObj.status = FileQueueStatus.Pending;
    this._queue.next(this._files);
  }

  private _uploadProgress(queueObj: FileQueueObject, event: any) {
    // update the FileQueueObject with the current progress
    const progress = Math.round(100 * event.loaded / event.total);
    console.log(progress)
    queueObj.progress = progress;
    queueObj.status = FileQueueStatus.Progress;
    this._queue.next(this._files);
  }

  private _uploadComplete(queueObj: FileQueueObject, response: HttpResponse<any>) {
    // update the FileQueueObject as completed
    queueObj.progress = 100;
    queueObj.status = FileQueueStatus.Success;
    queueObj.response = response;
    this._queue.next(this._files);
    this.onCompleteItem(queueObj, response.body);
  }

  private _uploadFailed(queueObj: FileQueueObject, response: HttpErrorResponse) {
    // update the FileQueueObject as errored
    queueObj.progress = 0;
    queueObj.status = FileQueueStatus.Error;
    queueObj.response = response;
    this._queue.next(this._files);
  }

  private _getTaskStatus(queueObj : FileQueueObject, event :any) {
    console.log("getTaskStatus")
    //console.log(JSON.stringify(event.body));
    //console.log(event.body[0].url_result);
    const resultUri : string = 'http://127.0.0.1:8000'+event.body[0].url_result;
    const req = new HttpRequest('GET', resultUri,{
      reportProgress: true,

    });
    // check task status
    this.http.request(req).subscribe(
      (event: any) => {
        if (event instanceof HttpResponse) {
      //  console.log("task result checking.....")
        //console.log(JSON.stringify(event.body));
        if (event.body.status === 'PENDING') {
          console.log("task result : " + event.body.status)
          console.log(JSON.stringify(event.body));
          this._uploadProgress(queueObj, event);
          
        }if (event.body.status === 'PROCESSING') {
          console.log("task result : " + event.body.status)
          console.log(JSON.stringify(event.body));
          this._uploadProgress(queueObj, event);
          
        }
         else if(event.body.status === 'SUCCESS') {
          console.log("task result success : " + event.body.status)
          this._uploadComplete(queueObj, event);
          queueObj.taskStatus.unsubscribe();
          //add file content
          let content : FileContent = {} as FileContent
          content.name = event.body.name;
          content.path = event.body.path;
          this.addFileContent('api/fileContent',content).subscribe(
            (res) => {
              //  console.log('response ' + JSON.stringify(res))
              console.log('content added successfully')
            },
            (err) => {
              console.log('exception while adding content ' + err)
            }
          )
      
      
        }
      }
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          this._uploadFailed(queueObj, err);
        } else {
          // The backend returned an unsuccessful response code.
          this._uploadFailed(queueObj, err);
        }
      }
    );
     console.log("finished")
  }

  public addFileContent(route: string, body) {
    return this.http.post<any>(this.createCompleteRoute(route, environment.urlAddress),
      body, this.generateHeaders());
  }
  private createCompleteRoute(route: string, envAddress: string) {
    return `${envAddress}/${route}`;
  }

  private generateHeaders() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
  }




}
// @Injectable({
//   providedIn: 'root'
// })
// export class FileUploadService {

//   constructor() { }
// }
