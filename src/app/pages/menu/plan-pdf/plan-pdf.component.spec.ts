import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanPDFComponent } from './plan-pdf.component';

describe('PlanPDFComponent', () => {
  let component: PlanPDFComponent;
  let fixture: ComponentFixture<PlanPDFComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanPDFComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanPDFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
