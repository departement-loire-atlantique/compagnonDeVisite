import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TuileComponent } from './tuile.component';

describe('TuileComponent', () => {
  let component: TuileComponent;
  let fixture: ComponentFixture<TuileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TuileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TuileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
