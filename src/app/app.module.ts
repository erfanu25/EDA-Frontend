import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {RouterModule} from "@angular/router";
import {MatToolbarModule} from "@angular/material/toolbar";
import { AnalysisHttpHandler } from './excel-data-analyser/data-analysis/service-api/analysis-http.handler';
import { HttpHandler } from './excel-data-analyser/data-analysis/service-api/http.handler';
import { CriteriaAddService } from './excel-data-analyser/data-analysis/criteria/services/criteria-add.service';
import { CriteriaViewService } from './excel-data-analyser/data-analysis/criteria/services/criteria-view.service';
import {MAT_SNACK_BAR_DEFAULT_OPTIONS} from '@angular/material/snack-bar';
import { PaginationModule } from './common/pagination/pagination.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { TabViewModule } from "primeng/tabview";

import { MotifModule } from '@ey-xd/ng-motif';
import { HttpClientModule } from '@angular/common/http';
import { MotifCssVariablePonyfillModule } from '@ey-xd/ng-motif';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule,
    PaginationModule,
    NgbModule,
    TabViewModule,
    HttpClientModule,
    MotifModule,
    MotifCssVariablePonyfillModule.forRoot()

  ],
  providers: [
    AnalysisHttpHandler,
    CriteriaAddService, 
    CriteriaViewService,
    HttpHandler,DatePipe,
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 5500}}
  ],
  exports: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
