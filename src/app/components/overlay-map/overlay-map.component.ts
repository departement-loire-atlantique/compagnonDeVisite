import { Component, OnInit, Input, Renderer2, ViewChild } from '@angular/core';
import { DesignSystemService } from 'src/app/services/design-system.service';

import 'hammerjs';

@Component({
  selector: 'app-overlay-map',
  templateUrl: './overlay-map.component.html',
  styleUrls: ['./overlay-map.component.scss']
})
export class OverlayMapComponent implements OnInit  {
  @Input()
  idTarget: string = "overlay-map";

  @Input()
  image:string | null = "";

  @Input()
  isIcon: boolean = true;

  @Input()
  title: string = $localize`:@@OverlayMapComp-titre:Carte`;

  icon: string = "icon-map";

  closeTxt = $localize `:@@OverlayMapComp-close:Fermer la boîte de dialogue \: ${this.title}:title:`

  constructor(
    private _ds: DesignSystemService,
    private renderer: Renderer2,
    ) { }

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

  public zoom(palier: number = 100) {
    let myImg  = document.getElementById('imagePlan') as HTMLElement;
    var currWidth = myImg.clientWidth;
    myImg.style.width = (currWidth - palier) + "px"
    myImg.style.objectFit = "cover";
  }
}

