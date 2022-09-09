import { AfterViewInit, Component, Input } from '@angular/core';

import { DesignSystemService } from 'src/app/services/design-system.service';

@Component({
  selector: 'app-collapser-oeuvre',
  templateUrl: './collapser-oeuvre.component.html',
  styleUrls: ['./collapser-oeuvre.component.scss'],
})
export class CollapserOeuvreComponent implements AfterViewInit {

  @Input()
  hasLoaded: boolean | undefined;

  @Input()
  titleAudio: string = "";

  @Input()
  audio: string | undefined;

  @Input()
  imagePlan: string | undefined;

  @Input()
  indications: string | undefined;

  constructor(private _ds: DesignSystemService) {}

  ngAfterViewInit(): void {
    this._ds.initCollapser();
  }

  public isAudio() {
    return this.audio ? "visible" : "hide";
  }

  public isImagePlan() {
    return this.imagePlan ? "visible" : "hide";
  }

  public isIndications() {
    return this.indications ? "visible" : "hide";
  }
}
