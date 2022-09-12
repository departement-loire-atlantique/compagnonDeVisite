import { Component, OnInit } from '@angular/core';
import { DesignSystemService } from 'src/app/services/design-system.service';
import { Item } from 'src/app/models/item';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(private _ds: DesignSystemService) { }

  ngOnInit(): void {
    this._ds.initMenu();
  }

  public getItem() {
    let items: Item[] = [];
    items[0] = {
      lbl: "Que souhaitez-vous visiter ?",
      url: "themes"
    }
    return items;
  }

}
