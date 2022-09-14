import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';
import { from } from 'rxjs';

import { JAngularService } from 'j-angular';

import { LecteurVideoOeuvreComponent } from './lecteur-video-oeuvre.component';

describe('LecteurVideoOeuvreComponent', () => {
  let component: LecteurVideoOeuvreComponent;
  let fixture: ComponentFixture<LecteurVideoOeuvreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LecteurVideoOeuvreComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LecteurVideoOeuvreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
