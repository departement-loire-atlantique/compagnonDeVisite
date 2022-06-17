import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private _nextPageRoute: string = "/TODO";

  languages = [
    { lbl: 'FR', url: '/fr' + this._nextPageRoute },
    { lbl: 'EN', url: '/en' + this._nextPageRoute },
    { lbl: 'LSF', url: '/fr-LSF' + this._nextPageRoute }
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

}
