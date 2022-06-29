import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { Category } from 'src/app/models/jcms/category';
import { environment } from 'src/environments/environment';
import { Item } from 'src/app/models/item'
import { CatsMngService } from 'src/app/services/cats-mng.service';
import { Router } from '@angular/router';

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
    private _router: Router,
    @Inject(LOCALE_ID) private _locale: string
  ) { }

  /**
   * Récupère les catégories enfant de la catégorie thématique
   */
  ngOnInit(): void {
    let espaceJcms = environment.lang[this._locale];

    if (!espaceJcms) {
      this._router.navigateByUrl('error/F-01', { skipLocationChange: true });
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
