import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { Item } from 'src/app/models/item';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private _nextPageRoute: string = "/themes";

  languages = [
    { lbl: 'FR', url: '/fr' + this._nextPageRoute, img: '🇫🇷' },
    { lbl: 'EN', url: '/en' + this._nextPageRoute, img: '🇬🇧' },
    { lbl: 'LSF', url: '/fr-LSF' + this._nextPageRoute, img: '👋' }
  ];

  constructor(@Inject(LOCALE_ID) public locale: string) {
    if (!environment.production) {
      for (let lang of this.languages) {
        lang.url = this._nextPageRoute;
      }
    }
  }

  ngOnInit(): void {
    console.log('TODO Home');
    console.log(this.locale);
  }

  getItem(): Item[] {
    let items: Item[] = [];
    for (let lang of this.languages) {
      let item: Item = {
        lbl: lang.lbl,
        img: lang.img,
        url: lang.url
      };
      items.push(item);
    }
    return items;
  }

}
