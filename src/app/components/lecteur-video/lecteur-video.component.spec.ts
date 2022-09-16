import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';
import { from } from 'rxjs';

import { JAngularService } from 'j-angular';

import { LecteurVideoComponent } from './lecteur-video.component';

describe('LecteurVideoComponent', () => {
  let component: LecteurVideoComponent;
  let fixture: ComponentFixture<LecteurVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LecteurVideoComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LecteurVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
