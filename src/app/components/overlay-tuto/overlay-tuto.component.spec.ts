import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverlayTutoComponent } from './overlay-tuto.component';

describe('OverlayTutoComponent', () => {
  let component: OverlayTutoComponent;
  let fixture: ComponentFixture<OverlayTutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverlayTutoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OverlayTutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
