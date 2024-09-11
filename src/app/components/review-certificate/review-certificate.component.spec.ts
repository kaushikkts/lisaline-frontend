import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewCertificateComponent } from './review-certificate.component';

describe('ReviewCertificateComponent', () => {
  let component: ReviewCertificateComponent;
  let fixture: ComponentFixture<ReviewCertificateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewCertificateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
