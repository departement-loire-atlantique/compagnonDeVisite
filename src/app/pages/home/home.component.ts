import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { Item } from 'src/app/models/item';
import { Category } from 'src/app/models/jcms/category';
import { CatsMngService } from 'src/app/services/cats-mng.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private _nextPageRoute: string = "themes";

  idCatRoot: string = '';
  imageFooter: string = 'assets/Groupe_3506.png';

  languages: { [key: string]: any } = {
    'fr': {
      lbl: 'Français',
      title: 'Version française : consultez la version française du site',
      url: environment.front + 'fr/' + this._nextPageRoute,
      img: 'icon-french',
      isPicto: true
    },
    'en': {
      lbl: 'English',
      title: 'English version : visit the english version of the website',
      url: environment.front + 'en/' + this._nextPageRoute,
      img: 'icon-english',
      isPicto: true
    },
    'fr-LSF': {
      lbl: 'Langue des signes française',
      title: 'Version LSF : consultez la version Langue des signes française du site',
      url: environment.front + 'fr-LSF/' + this._nextPageRoute,
      img: 'icon-lsf',
      isPicto: true
    },
    'fr-FALC': {
      lbl: 'Français simplifié',
      title: 'Version FALC : consultez la version Facile à lire et à comprendre',
      url: environment.front + 'fr-FALC/' + this._nextPageRoute,
      img: 'icon-falc',
      isPicto: true
    },
    'fr-Adapt': {
      lbl: 'Adapté aux personnes malvoyantes',
      title: 'Version adapté : consultez la version adapté aux personnes malvoyantes',
      url: environment.front + 'fr-FALC/' + this._nextPageRoute,
      img: 'icon-handicap-visuel',
      isPicto: true
    }
  };

  constructor(@Inject(LOCALE_ID) public locale: string,
              private _catMng: CatsMngService,) {
    if (!environment.production) {
      for (let key in this.languages) {
        this.languages[key].url = this._nextPageRoute;
      }
    } else {
      this.languages[locale].url = this._nextPageRoute;
    }
  }

  ngOnInit(): void {

    this.idCatRoot = environment.catRoot;

    this._catMng.cat(this.idCatRoot).subscribe((cat: Category) => {
      if (cat.image) {
        this.imageFooter = cat.image;
      }
    });

  }

  getItem(): Item[] {
    let items: Item[] = [];
    for (let key in this.languages) {
      let item: Item = {
        lbl: this.languages[key].lbl,
        title: '',
        img: this.languages[key].img,
        url: this.languages[key].url,
        isPicto: this.languages[key].isPicto,
      };
      items.push(item);
    }
    return items;
  }

}
