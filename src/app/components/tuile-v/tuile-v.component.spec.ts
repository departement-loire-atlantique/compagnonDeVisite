import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TuileVComponent } from './tuile-v.component';

describe('TuileVComponent', () => {
  let component: TuileVComponent;
  let fixture: ComponentFixture<TuileVComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TuileVComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TuileVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
