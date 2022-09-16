import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { Item } from 'src/app/models/item';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  private _nextPageRoute: string = "themes";

  languages: { [key: string]: any } = {
    'fr': { lbl: 'FR', url: environment.front + 'fr/' + this._nextPageRoute, img: 'icon-french', isPicto: true },
    'en': { lbl: 'EN', url: environment.front + 'en/' + this._nextPageRoute, img: 'icon-english', isPicto: true },
    'fr-LSF': { lbl: 'LSF', url: environment.front + 'fr-LSF/' + this._nextPageRoute, img: 'icon-lsf', isPicto: true },
    'fr-PMR': { lbl: 'PMR', url: environment.front + 'fr-PMR/' + this._nextPageRoute, img: 'icon-handicap-moteur', isPicto: true }
  };

  constructor(@Inject(LOCALE_ID) public locale: string) {
    if (!environment.production) {
      for (let key in this.languages) {
        this.languages[key].url = this._nextPageRoute;
      }
    }else {
      this.languages[locale].url = this._nextPageRoute;
    }
  }

  getItem(): Item[] {
    let items: Item[] = [];
    for (let key in this.languages) {
      let item: Item = {
        lbl: this.languages[key].lbl,
        img: this.languages[key].img,
        url: this.languages[key].url,
        isPicto: this.languages[key].isPicto,
      };
      items.push(item);
    }
    return items;
  }

}
