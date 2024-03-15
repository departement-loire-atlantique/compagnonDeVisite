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
      lbl: $localize`:@@MenuComp-elem1:Parcours`,
      url: "/themes"
    }
    items[1] = {
      lbl: $localize`:@@MenuComp-elem2:Langues`,
      url: "/"
    }
    items[2] = {
      lbl: $localize`:@@MenuComp-elem3:Infos Pratiques`,
      url: "/infos"
    }
    items[3] = {
      lbl: $localize`:@@MenuComp-elem4:Plan (PDF)`,
      url: "/planPDF"
    }
    items[4] = {
      lbl: $localize`:@@MenuComp-elem5:Aide`,
      url: "/aide"
    }
    items[5] = {
      lbl: $localize`:@@MenuComp-elem6:Contacts`,
      url: "/contacts"
    }
    items[6] = {
      lbl: $localize`:@@MenuComp-elem7:Crédits`,
      url: "/credits"
    }
    return items;
  }

}
