import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TuileHExploreComponent } from './tuile-h-explore.component';

describe('TuileHExploreComponent', () => {
  let component: TuileHExploreComponent;
  let fixture: ComponentFixture<TuileHExploreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TuileHExploreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TuileHExploreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
