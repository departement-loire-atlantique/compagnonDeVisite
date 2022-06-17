import { Component, OnInit } from '@angular/core';
import { DesignSystemService } from 'src/app/services/design-system.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(private _ds: DesignSystemService) { }

  ngOnInit(): void {
    this._ds.initOverlay();
  }

}
