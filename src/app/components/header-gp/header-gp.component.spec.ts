import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderGpComponent } from './header-gp.component';

describe('HeaderGpComponent', () => {
  let component: HeaderGpComponent;
  let fixture: ComponentFixture<HeaderGpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderGpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderGpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
