import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingResultDialog } from './booking-result-dialog';

describe('BookingResultDialogComponent', () => {
  let component: BookingResultDialog;
  let fixture: ComponentFixture<BookingResultDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingResultDialog ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingResultDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
