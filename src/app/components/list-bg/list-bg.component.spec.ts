import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBGComponent } from './list-bg.component';

describe('ListBGComponent', () => {
  let component: ListBGComponent;
  let fixture: ComponentFixture<ListBGComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListBGComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBGComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
