import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { PaginationComponent } from './pagination.component';

@NgModule({
  declarations: [PaginationComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgbPaginationModule,
  ],
  exports: [PaginationComponent],
})
export class PaginationModule { }
