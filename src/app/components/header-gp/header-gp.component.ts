import { Component, Input, OnInit } from '@angular/core';
import { map } from 'lodash';
import { DesignSystemService } from 'src/app/services/design-system.service';

@Component({
  selector: 'app-header-gp',
  templateUrl: './header-gp.component.html',
  styleUrls: ['./header-gp.component.scss']
})
export class HeaderGpComponent implements OnInit {

  @Input()
  urlLanguage: string | undefined;

  @Input()
  urlFavoris: string | undefined;

  localeList: Map<string,string> = new Map<string,string>([
    [ 'EN', $localize`:@@Menulang-fr:English` ],
    [ 'FR', $localize`:@@Menulang-fr:Français`],
    [ 'LSF', $localize`:@@Menulang-fr:LSF`],
    [ 'FALC', $localize`:@@Menulang-fr:FALC`],
  ]);

  constructor(
    private _ds: DesignSystemService,
    ) { }

  ngOnInit(): void {
    this._ds.initOverlay();
  }

  /**
   * get language
   */
  public getLanguage(){
    let codeLocale:string = $localize.locale || 'FR';

    if (!this.localeList.has(codeLocale))
      codeLocale = 'FR';

    return this.localeList.get(codeLocale);
  }

}
