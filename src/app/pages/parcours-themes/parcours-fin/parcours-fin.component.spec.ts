import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParcoursFinComponent } from './parcours-fin.component';

describe('ParcoursFinComponent', () => {
  let component: ParcoursFinComponent;
  let fixture: ComponentFixture<ParcoursFinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParcoursFinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParcoursFinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
