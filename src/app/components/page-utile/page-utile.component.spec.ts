import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageUtileComponent } from './page-utile.component';

describe('PageUtileComponent', () => {
  let component: PageUtileComponent;
  let fixture: ComponentFixture<PageUtileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageUtileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageUtileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
