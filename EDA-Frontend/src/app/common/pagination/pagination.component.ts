import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "pagination",
  templateUrl: "./pagination.component.html",
  styleUrls: ["./pagination.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent {
  @Input() size: number;
  @Input() currentPage: number;
  @Input() totalItems = 0;
  @Output() pageSizeChange = new EventEmitter<{ page: number; size: number }>();
  get totalPages() {
    return Math.ceil(this.totalItems / this.size);
  }
  gotoPage(page = 1) {
    const data = {
      page: +page,
      size: +this.size,
    };
    this.pageSizeChange.emit(data);
  }
  sizeChange() {
    const data = {
      page: 1,
      size: +this.size,
    };
    this.pageSizeChange.emit(data);
  }
}
