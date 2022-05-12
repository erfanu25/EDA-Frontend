import {Routes} from "@angular/router";
import {DataMappingComponent} from "./data-mapping/data-mapping.component";
import {DataAnalysisComponent} from "./data-analysis/data-analysis.component";
import { DataIngestionComponent } from "./data-ingestion/data-ingestion.component";

export const routes: Routes = [

    {
      path: '', component: DataIngestionComponent
    },

    {
      path: 'dataMapping', component: DataMappingComponent
    },
    {
      path: 'dataAnalysis', component: DataAnalysisComponent
    }

];
