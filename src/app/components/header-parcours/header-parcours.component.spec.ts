import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderParcoursComponent } from './header-parcours.component';

describe('HeaderParcoursComponent', () => {
  let component: HeaderParcoursComponent;
  let fixture: ComponentFixture<HeaderParcoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderParcoursComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderParcoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
