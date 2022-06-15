import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParcoursThemesComponent } from './parcours-themes.component';

describe('ParcoursThemesComponent', () => {
  let component: ParcoursThemesComponent;
  let fixture: ComponentFixture<ParcoursThemesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParcoursThemesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParcoursThemesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
