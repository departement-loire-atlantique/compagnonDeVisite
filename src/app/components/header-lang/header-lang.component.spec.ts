import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderLangComponent } from './header-lang.component';

describe('HeaderLangComponent', () => {
  let component: HeaderLangComponent;
  let fixture: ComponentFixture<HeaderLangComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderLangComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderLangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
