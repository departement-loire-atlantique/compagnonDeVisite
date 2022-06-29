import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TuileHEtapeComponent } from './tuile-h-etape.component';

describe('TuileHComponent', () => {
  let component: TuileHEtapeComponent;
  let fixture: ComponentFixture<TuileHEtapeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TuileHEtapeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TuileHEtapeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
