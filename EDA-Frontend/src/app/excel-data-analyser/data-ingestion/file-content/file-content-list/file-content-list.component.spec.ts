import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileContentListComponent } from './file-content-list.component';

describe('FileContentListComponent', () => {
  let component: FileContentListComponent;
  let fixture: ComponentFixture<FileContentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileContentListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileContentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
