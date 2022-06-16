import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-menu-gp',
  templateUrl: './menu-gp.component.html',
  styleUrls: ['./menu-gp.component.scss']
})
export class MenuGpComponent  {

  @Input()
  urlLanguage: string | undefined;

  @Input()
  urlFavoris: string | undefined;

  constructor() { }

}
