import { FileUploadService } from './data-ingestion/file-upload/file-upload.service';
import {RouterModule, Routes} from "@angular/router";
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from "@angular/core";
import { MatCardModule } from '@angular/material/card';
import {TableModule} from "primeng/table";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatRadioModule} from "@angular/material/radio";
import {CommonModule, DecimalPipe} from "@angular/common";
import {DialogModule} from "primeng/dialog";
import {SpreadsheetAllModule} from "@syncfusion/ej2-angular-spreadsheet";
import {PaginatorModule} from "primeng/paginator";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {SharedModule} from "primeng/api";
import {AutoCompleteModule} from "primeng/autocomplete";
import { DataAnalysisComponent } from './data-analysis/data-analysis.component';
import {routes} from "./excel-data-analyser.routes";
import {ButtonModule} from "primeng/button";
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
import { DataIngestionComponent } from './data-ingestion/data-ingestion.component';
import { FileUploadComponent } from './data-ingestion/file-upload/file-upload.component';
import { FileContentListComponent } from './data-ingestion/file-content/file-content-list/file-content-list.component';
import { CriteriaAddComponent } from "./data-analysis/criteria/components/criteria-add/criteria-add.component";
import { CriteriaComponent } from "./data-analysis/criteria/components/criteria-view/criteria.component";
import {CheckboxModule} from "primeng/checkbox";
import {TagModule} from "primeng/tag";
import {AppModule} from "../app.module";
import {TopbarComponent} from "./topbar/topbar.component";
import { DataMappingComponent } from "./data-mapping/component/data-mapping.component";
import { DialogComponent } from "./data-mapping/component/dialog.component";
import { TableMapperComponent } from "./data-mapping/component/table-data-mapper.component";
import { MatDialogModule } from "@angular/material/dialog";
import { DataMappingService } from "./data-mapping/services/data-mapping.service";
import { ViewDataMapperComponent } from "./data-mapping/component/view-data-mapper.component";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import {DataAnalysisService} from "./data-analysis/service-api/data-analysis.service";
import {DataAnalyserTableComponent} from "./data-analysis/data-analyser-table/data-analyser-table.component";

import { AdvanceFilterComponent } from './data-analysis/advance-filter/advance-filter.component';
import { PaginationModule } from "../common/pagination/pagination.module";
import { FiltersComponent } from './data-analysis/advance-filter/filters/filters.component';
import { NgxSliderModule } from "@angular-slider/ngx-slider";
import { EmployeeDefaultFiltersComponent } from './data-analysis/default-filters/employee-default-filters/employee-default-filters.component';
import { GridviewAnalysisComponent } from './data-analysis/gridview-analysis/gridview-analysis.component';
import { TabViewModule } from "primeng/tabview";

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    MatCardModule,
    TableModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatProgressBarModule,
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
    DragDropModule,
    CheckboxModule,
    TagModule,
    MatDialogModule,
    MatSnackBarModule,
    PaginationModule,
    NgxSliderModule,
    TabViewModule
    // AppModule,


  ],
  declarations: [
    FileUploadComponent,
    DataMappingComponent,
    DataAnalysisComponent,
    DataIngestionComponent,
    FileContentListComponent,
    DataIngestionComponent,
    DataMappingComponent,
    ViewDataMapperComponent,
    DataAnalysisComponent,
    CriteriaAddComponent,
    CriteriaComponent,
    TopbarComponent,
    DialogComponent,
    TableMapperComponent,
    DataAnalysisComponent,
    TopbarComponent,
    DataAnalyserTableComponent,
    AdvanceFilterComponent,
    FiltersComponent,
    EmployeeDefaultFiltersComponent,
    GridviewAnalysisComponent
    // DataAnalyserTableComponent,

  ],
  providers: [
    DataMappingService,
    DataAnalysisService,
    DecimalPipe,
    FileUploadService
  ],

  exports: [
    RouterModule,
    
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ExcelDataAnalyserModule { }
