import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header-gp',
  templateUrl: './header-gp.component.html',
  styleUrls: ['./header-gp.component.scss']
})
export class HeaderGpComponent  {

  @Input()
  urlLanguage: string | undefined;

  @Input()
  urlFavoris: string | undefined;

  constructor() { }

}
