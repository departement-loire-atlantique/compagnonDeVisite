import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartageRsComponent } from './partage-rs.component';

describe('PartageRsComponent', () => {
  let component: PartageRsComponent;
  let fixture: ComponentFixture<PartageRsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartageRsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartageRsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
