import { Component, OnInit, Input } from '@angular/core';
import { DesignSystemService } from 'src/app/services/design-system.service';

@Component({
  selector: 'app-overlay-map',
  templateUrl: './overlay-map.component.html',
  styleUrls: ['./overlay-map.component.scss']
})
export class OverlayMapComponent implements OnInit {

  @Input()
  image:string | undefined;

  title: string = $localize`:@@OverlayMapComp-titre:Carte`;

  closeTxt = $localize `:@@OverlayMapComp-close:Fermer la boîte de dialogue \: ${this.title}:title:`

  constructor(
    private _ds: DesignSystemService) { }

  ngOnInit(): void {
    this._ds.initOverlay();
  }

}
