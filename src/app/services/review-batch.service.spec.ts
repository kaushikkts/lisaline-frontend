import { TestBed } from '@angular/core/testing';

import { ReviewBatchService } from './review-batch.service';

describe('ReviewBatchService', () => {
  let service: ReviewBatchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReviewBatchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
