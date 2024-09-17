import { TestBed } from '@angular/core/testing';

import { ReviewCertificateService } from './review-certificate.service';

describe('ReviewCertificateService', () => {
  let service: ReviewCertificateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReviewCertificateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
