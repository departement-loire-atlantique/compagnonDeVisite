import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/models/item';
import { Category } from 'src/app/models/jcms/category';
import { CatsMngService } from 'src/app/services/cats-mng.service';
import { EspaceByLangService } from 'src/app/services/espace-by-lang.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-parcours-themes',
  templateUrl: './parcours-themes.component.html',
  styleUrls: ['./parcours-themes.component.scss']
})
export class ParcoursThemesComponent implements OnInit {

  idCatHome: string = environment.catHome;
  listCat: Item[] | undefined;

  constructor(
    private _catMng: CatsMngService,
    private _jcmsEspace: EspaceByLangService,
  ) { }

  /**
   * Récupère les catégories enfant de la catégorie thématique
   */
  ngOnInit(): void {
    const espaceJcms = this._jcmsEspace.getJcmsSpace();

    if (!espaceJcms) {
      return;
    }

    this._catMng.catsChildren(espaceJcms.catHome).subscribe((cats: Category[]) => {

      if (!this.listCat) {
        this.listCat = [];
      }

      for (let ind = 0; ind < cats.length; ind++) {
        let c = cats[ind];
        this.listCat.splice(ind, 0, {
          img: c.image,
          lbl: c.title,
          url: "/themes/" + c.id,
        })
      }
    });
  }

  /**
   * Get la liste des catégories
   * @returns la liste de catégories
   */
  public getListCat() {
    return this.listCat;
  }

}
