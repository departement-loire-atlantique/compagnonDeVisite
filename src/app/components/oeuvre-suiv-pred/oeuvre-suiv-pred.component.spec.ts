import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OeuvreSuivPredComponent } from './oeuvre-suiv-pred.component';

describe('OeuvreSuivPredComponent', () => {
  let component: OeuvreSuivPredComponent;
  let fixture: ComponentFixture<OeuvreSuivPredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OeuvreSuivPredComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OeuvreSuivPredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
