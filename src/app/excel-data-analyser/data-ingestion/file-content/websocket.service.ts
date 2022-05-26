import { catchError, switchAll, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { WebSocketSubject } from 'rxjs/observable/dom/WebSocketSubject';
import { webSocket } from 'rxjs/webSocket';

// import { webSocket } from "rxjs/"webSocket;


@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  public socket$: WebSocketSubject<any>;
  private messagesSubject$ = new Subject();
  public messages$ = this.messagesSubject$.pipe(switchAll(), catchError(e => { throw e }));
  
  public connect(): void {
  
    if (!this.socket$ || this.socket$.closed) {
      this.socket$ = this.getNewWebSocket();
      const messages = this.socket$.pipe(
        tap({
          error: error => console.log(error),
        }), catchError(_ => EMPTY));
        
      this.messagesSubject$.next(messages);
    }
  }
  
  private getNewWebSocket() {
    return webSocket("ws://localhost:8000/ws");
  }
  sendMessage(msg: any) {
    this.socket$.next(msg);
  }
  close() {
    this.socket$.complete(); 
  }




}
