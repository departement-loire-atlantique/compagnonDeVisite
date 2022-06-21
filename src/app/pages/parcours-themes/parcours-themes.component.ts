import { Component, OnInit } from '@angular/core';
import { JAngularService } from 'j-angular';
import { Observable, map } from 'rxjs';
import { Category } from 'src/app/models/jcms/category';
import { environment } from 'src/environments/environment';
import { Item } from 'src/app/models/item'
import { CatsMngService } from 'src/app/services/cats-mng.service';

@Component({
  selector: 'app-parcours-themes',
  templateUrl: './parcours-themes.component.html',
  styleUrls: ['./parcours-themes.component.scss']
})
export class ParcoursThemesComponent implements OnInit {

  idCatHome: string = environment.catHome;
  listCat: Item[] | undefined;

  constructor(private _catMng: CatsMngService) { }

  /**
   * Récupère les catégories enfant de la catégorie thématique
   */
  ngOnInit(): void {
    this._catMng.catsChildren(this.idCatHome).subscribe((cats: Category[]) => {

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
