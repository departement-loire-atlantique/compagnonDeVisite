import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TuileHComponent } from './tuile-h.component';

describe('TuileHComponent', () => {
  let component: TuileHComponent;
  let fixture: ComponentFixture<TuileHComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TuileHComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TuileHComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
