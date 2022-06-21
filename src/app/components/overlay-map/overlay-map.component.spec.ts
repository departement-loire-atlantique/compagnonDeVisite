import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverlayMapComponent } from './overlay-map.component';

describe('OverlayMapComponent', () => {
  let component: OverlayMapComponent;
  let fixture: ComponentFixture<OverlayMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverlayMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OverlayMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
