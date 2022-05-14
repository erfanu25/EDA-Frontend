import { TestBed } from '@angular/core/testing';

import { FileContentServiceService } from './file-content-service.service';

describe('FileContentServiceService', () => {
  let service: FileContentServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileContentServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
