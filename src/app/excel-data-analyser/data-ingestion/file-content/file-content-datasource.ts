import { FileContentServiceService } from './file-content-service.service';
import { FileContentListApiReqParam } from './model/file-content-list-api-req-param';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, filter, finalize, map } from 'rxjs/operators';
import { FileContent } from './model/file-content';
export class FileContentDatasource implements DataSource<FileContent> {
    [x: string]: any;
    private fileContentSubject = new BehaviorSubject<FileContent[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    private contentTotal = new BehaviorSubject<number>(0);
    public loading$ = this.loadingSubject.asObservable();
    public size$ = this.contentTotal.asObservable();

    constructor(private fileContentService: FileContentServiceService) { }

    loadFileContents(reqParam: FileContentListApiReqParam) {
        this.loadingSubject.next(true);
        this.fileContentService.getAllFileContent(reqParam)
            .pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false)),
            )
            .subscribe(res => {
                this.contentTotal.next(res['total']);
                this.fileContentSubject.next(res['data']);
                console.log(res['data']);
            });
    }

    connect(collectionViewer: CollectionViewer): Observable<FileContent[]> {
        //  console.log("Connecting data source");
        return this.fileContentSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.loadingSubject.complete();
        this.loadingSubject.complete();
    }

    filterDataSourceByFileId(fileId, injectionStatus) {
        this.fileContentSubject.asObservable()
            .pipe(
                map((fileContents) => {
                    return fileContents.map(fileContent => {
                        let _id = fileContent["_id"]
                        if (_id == fileId) {
                            if (injectionStatus.status != "FAIL") {
                                fileContent["status"]["name"] = "INJECTED";
                            } else {
                                fileContent["status"]["name"] = "TRY_AGAIN";
                            }
                            fileContent["isLoading"] = false;
                        }
                        return fileContent;
                    })
                })
            ).subscribe((data) => {
                this.fileContentSubject = new BehaviorSubject(data);
            });
    }


    updateLoadingStatus(fileId) {
        this.fileContentSubject.asObservable()
            .pipe(
                map((fileContents) => {
                    return fileContents.map(fileContent => {
                        let _id = fileContent["_id"]
                        if (_id == fileId) {
                            fileContent["isLoading"] = true;
                        }
                        return fileContent;
                    })
                })
            ).subscribe((data) => {
                console.log(data);
                this.fileContentSubject = new BehaviorSubject(data);
            });
    }


}
