import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// const routes: Routes = [
//   { path: '', loadChildren: () => import('./excel-data-analyser/excel-data-analyser.module').then(m => m.ExcelDataAnalyserModule) },
// ];
const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./excel-data-analyser/data-ingestion/data-ingestion.module').then(m => m.DataIngestionModule)
  },
  {
    path: 'dataMapping',
    loadChildren: () => import('./excel-data-analyser/data-mapping/data-mapping.module').then(m => m.DataMappingModule)
  },
  {
    path: 'dataAnalysis',
    loadChildren: () => import('./excel-data-analyser/data-analysis/data-analysis.module').then(m => m.DataAnalysisModule)
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
