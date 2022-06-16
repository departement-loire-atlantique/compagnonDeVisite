import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuGpComponent } from './menu-gp.component';

describe('MenuGpComponent', () => {
  let component: MenuGpComponent;
  let fixture: ComponentFixture<MenuGpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuGpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuGpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
