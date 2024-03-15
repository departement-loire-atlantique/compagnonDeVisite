import { Component, OnInit } from '@angular/core';
import { JAngularService,JcmsPager } from 'j-angular';
import { JcmsEspace } from 'src/app/models/environment';
import { EspaceByLangService } from 'src/app/services/espace-by-lang.service';
import { Observable } from 'rxjs';
import { Content } from 'src/app/models/jcms/content';
import { CatsMngService } from 'src/app/services/cats-mng.service';
import { Category } from 'src/app/models/jcms/category';
import { Item } from 'src/app/models/item';
import { MenuBurger } from 'src/app/models/jcms/menuburger';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  espaceJcms: JcmsEspace | undefined;
  idCatMenu: string = '';
  pager: JcmsPager<Content> | undefined;

  menuBurger!: MenuBurger;
  listCat: Item[] | undefined;

  constructor( private _jcms: JAngularService, private _jcmsEspace: EspaceByLangService, private _catMng: CatsMngService, ) {
    this.espaceJcms = this._jcmsEspace.getJcmsSpace();
    if (this.espaceJcms) {
      this.idCatMenu = this.espaceJcms.catMenu;
    }

    this._catMng.catsChildren(this.idCatMenu).subscribe((cats: Category[]) => {
      if (!this.listCat) {
        this.listCat = [];
      }

      cats.forEach((currentValue, index) => {
        this.listCat?.splice(index, 0, {
          img: currentValue.icon,
          lbl: currentValue.title,
          url: currentValue.subTitle,
        })
      });
    });
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
      this._jcms.get<MenuBurger>('data/' + itContent.id).subscribe((res : MenuBurger) => {
        this.menuBurger = res;
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
          text: 'contact*',
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
