import { Component, OnInit } from '@angular/core';
import { JAngularService,JcmsPager } from 'j-angular';
import { JcmsEspace } from 'src/app/models/environment';
import { EspaceByLangService } from 'src/app/services/espace-by-lang.service';
import { Observable } from 'rxjs';
import { Content } from 'src/app/models/jcms/content';
import { MenuBurger, MenuBurgerMap } from 'src/app/models/jcms/menuburger';

@Component({
  selector: 'app-aide',
  templateUrl: './aide.component.html',
  styleUrls: ['./aide.component.scss']
})
export class AideComponent implements OnInit {
  espaceJcms: JcmsEspace | undefined;
  idCatMenu: string = '';
  pager: JcmsPager<Content> | undefined;

  menuBurgerMap: MenuBurgerMap = new MenuBurgerMap();
  menuBurger!: MenuBurger;

  constructor(
    private _jcms: JAngularService,
    private _jcmsEspace: EspaceByLangService ) {
      this.espaceJcms = this._jcmsEspace.getJcmsSpace();
      if (this.espaceJcms) {
        this.idCatMenu = this.espaceJcms.catMenu;
      }
  }

  ngOnInit(): void {
    this.research();
  }

  /**
   * Stockage des résultats
   * @param obs
   */
  public processResult(obs: Observable<JcmsPager<Content>>) {
    obs.subscribe((pager: JcmsPager<Content>) => {

      this.pager = pager;
      const contents = pager.dataInPage;
      if (contents.length < 1) return;

      const itContent = contents[0];
      this._jcms.get<MenuBurger>('data/' + itContent.id).subscribe(res => {
        this.menuBurger = this.menuBurgerMap.mapToMenuBurger(res);
      });
    });
  }
  /**
   * Lance la recherche du HTML
   * @returns
   */
  public research(): void {
    this.processResult(
      this._jcms.getPager<Content>('search', {
        params: {
          types: ['MenuBurger'],
          text: 'aide*',
          exactType: true,
          wrkspc: this.espaceJcms ? this.espaceJcms.espace : "",
          cids: this.idCatMenu,
        },
     })
    );
  }

  /**
   * get label bouton
   */
  public getLabelBtn() {
    return $localize`:@@BackComp-text:Retour` ;
  }
}
