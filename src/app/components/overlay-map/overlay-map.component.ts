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

  title: string = "Carte";

  constructor(
    private _ds: DesignSystemService) { }

  ngOnInit(): void {
    this._ds.initOverlay();
  }

}
