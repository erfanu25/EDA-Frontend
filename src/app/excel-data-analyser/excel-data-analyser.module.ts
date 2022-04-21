import {RouterModule, Routes} from "@angular/router";
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from "@angular/core";
import { MatCardModule } from '@angular/material/card';
import {TableModule} from "primeng/table";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {HttpClientModule} from "@angular/common/http";
import {MatRadioModule} from "@angular/material/radio";
import {CommonModule} from "@angular/common";
import {DialogModule} from "primeng/dialog";
import {SpreadsheetAllModule} from "@syncfusion/ej2-angular-spreadsheet";
import {PaginatorModule} from "primeng/paginator";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {SharedModule} from "primeng/api";

import {AutoCompleteModule} from "primeng/autocomplete";
import { DataIngestionComponent } from './data-ingestion/data-ingestion.component';
import { DataMappingComponent } from './data-mapping/data-mapping.component';
import { DataAnalysisComponent } from './data-analysis/data-analysis.component';
import {routes} from "./excel-data-analyser.routes";
import {ButtonModule} from "primeng/button";
import {BrowserModule} from "@angular/platform-browser";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatInputModule} from "@angular/material/input";
import {InputTextModule} from "primeng/inputtext";
import {MatSelectModule} from "@angular/material/select";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {MatTabsModule} from "@angular/material/tabs";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {RippleModule} from "primeng/ripple";
import {MultiSelectModule} from "primeng/multiselect";
import {SliderModule} from "primeng/slider";
import {ProgressBarModule} from "primeng/progressbar";
import {CalendarModule} from "primeng/calendar";
import {CardModule} from "primeng/card";
import {TabMenuModule} from "primeng/tabmenu";
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    MatCardModule,
    TableModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatProgressBarModule,
    HttpClientModule,
    MatRadioModule,
    CommonModule,
    DialogModule,
    SpreadsheetAllModule,
    // DropDownButtonModule,
    PaginatorModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    SharedModule,
    AutoCompleteModule,
    ButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    InputTextModule,
    MatSelectModule,
    NgbModule,
    MatTabsModule,
    MatButtonToggleModule,
    RippleModule,
    MultiSelectModule,
    SliderModule,
    ProgressBarModule,
    CalendarModule,
    CardModule,
    TabMenuModule,
    DragDropModule

  ],
  declarations: [
    DataIngestionComponent,
    DataMappingComponent,
    DataAnalysisComponent],
  exports: [
    RouterModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ExcelDataAnalyserModule { }
