import { AfterViewInit, Component, Input } from '@angular/core';

import { DesignSystemService } from 'src/app/services/design-system.service';

import { Indication, IndicationMap } from 'src/app/models/jcms/indication';
import { Item } from 'src/app/models/item';

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
  audio: string = "";

  @Input()
  imagePlan: string | null = "";

  @Input()
  indications: Indication[] | undefined;

  constructor(private _ds: DesignSystemService) {}

  ngAfterViewInit(): void {
    this._ds.initCollapser();
  }

  public checkURL(url: string) {
    return (url.match(/\.(jpeg|jpg|gif|png|ico)$/) != null);
  }

}
