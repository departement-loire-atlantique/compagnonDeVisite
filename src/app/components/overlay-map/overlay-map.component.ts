import { Component, OnInit, Input } from '@angular/core';
import { DesignSystemService } from 'src/app/services/design-system.service';

@Component({
  selector: 'app-overlay-map',
  templateUrl: './overlay-map.component.html',
  styleUrls: ['./overlay-map.component.scss']
})
export class OverlayMapComponent implements OnInit {

  @Input()
  image:string | null = "";

  @Input()
  isIcon: boolean = true;

  @Input()
  title: string = "Carte";

  icon: string = "icon-map";

  constructor(
    private _ds: DesignSystemService) {
     }

  ngOnInit(): void {
    this._ds.initOverlay();
  }

  public getClassButton() {
    if (this.isIcon)
      return "ds44-btn--menu ds44-btnIcoText--maxi ds44--xl-padding btn-menu-component";

    return "ds44-btnStd ds44-fullWBtn";
  }

  public getClassIcon() {
    if (this.isIcon)
      return "icon icon--large " + this.icon;

    return "icon " + this.icon
  }

}
