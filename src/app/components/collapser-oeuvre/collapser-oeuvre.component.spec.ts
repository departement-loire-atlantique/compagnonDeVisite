import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollapserOeuvreComponent } from './collapser-oeuvre.component';

describe('CollapserOeuvreComponent', () => {
  let component: CollapserOeuvreComponent;
  let fixture: ComponentFixture<CollapserOeuvreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CollapserOeuvreComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollapserOeuvreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
