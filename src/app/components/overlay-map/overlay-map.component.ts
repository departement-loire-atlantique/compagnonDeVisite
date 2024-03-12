import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { DesignSystemService } from 'src/app/services/design-system.service';

import panzoom from "panzoom";

@Component({
  selector: 'app-overlay-map',
  templateUrl: './overlay-map.component.html',
  styleUrls: ['./overlay-map.component.scss']
})
export class OverlayMapComponent implements OnInit, AfterViewInit {
  @ViewChild('imagePlan', { static: false }) imagePlan!: ElementRef;

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
    ) { }

  ngOnInit(): void {
    this._ds.initOverlay();
  }

  ngAfterViewInit() {
    panzoom(this.imagePlan.nativeElement, {
      maxZoom: 5,
      minZoom: 0.5
    });
  }

  public getClassButton() {
    if (this.isIcon)
      return "ds44-btn--menu ds44-btnIcoText--maxi ds44--xl-padding btn-menu-component";

    return "ds44-btnStd ds44-fullWBtn";
  }

  public getClassIcon() {
    if (this.isIcon)
      return "icon icon--sizeL " + this.icon;

    return "icon " + this.icon
  }

  public zoom(palier: number = 100) {
    var currWidth = this.imagePlan.nativeElement.clientWidth;
    if (currWidth < 300) {
      currWidth = 300;
    } else if (currWidth > 700) {
      currWidth = 700;
    }
      this.imagePlan.nativeElement.style.width = (currWidth - palier) + "px"
      this.imagePlan.nativeElement.style.objectFit = "cover";
  }
}

