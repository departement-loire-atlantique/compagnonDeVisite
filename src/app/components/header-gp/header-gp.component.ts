import { Component, Inject, Input, LOCALE_ID, OnInit } from '@angular/core';
import { DesignSystemService } from 'src/app/services/design-system.service';

@Component({
  selector: 'app-header-gp',
  templateUrl: './header-gp.component.html',
  styleUrls: ['./header-gp.component.scss']
})
export class HeaderGpComponent implements OnInit {

  @Input()
  urlFavoris: string | undefined;

  localeList: Map<string,string> = new Map<string,string>([
    [ 'en', $localize`:@@Menulang-fr:English` ],
    [ 'fr', $localize`:@@Menulang-fr:Français`],
    [ 'lsf', $localize`:@@Menulang-fr:LSF`],
    [ 'falc', $localize`:@@Menulang-fr:FALC`],
  ]);

  constructor(
    @Inject(LOCALE_ID) public locale: string,
    private _ds: DesignSystemService,
    ) { }

  ngOnInit(): void {
    this._ds.initOverlay();
  }

  /**
   * get language
   */
  public getLanguage(){

    let codeLocale:string = this.locale || 'fr';

    if (!this.localeList.has(codeLocale))
      codeLocale = 'fr';

    return this.localeList.get(codeLocale);
  }

}
