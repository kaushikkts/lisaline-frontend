import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewBatchComponent } from './review-batch.component';

describe('ReviewBatchComponent', () => {
  let component: ReviewBatchComponent;
  let fixture: ComponentFixture<ReviewBatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewBatchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewBatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
