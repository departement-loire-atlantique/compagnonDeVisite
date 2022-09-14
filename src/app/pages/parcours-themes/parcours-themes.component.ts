import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { JcmsEspace } from 'src/app/models/environment';
import { JAngularService } from 'j-angular';
import { Item } from 'src/app/models/item';
import { Category } from 'src/app/models/jcms/category';
import { Media } from 'src/app/models/jcms/media';
import { buildUrlMedia } from 'src/app/models/jcms/content';
import { CatsMngService } from 'src/app/services/cats-mng.service';
import { EspaceByLangService } from 'src/app/services/espace-by-lang.service';

@Component({
  selector: 'app-parcours-themes',
  templateUrl: './parcours-themes.component.html',
  styleUrls: ['./parcours-themes.component.scss']
})
export class ParcoursThemesComponent implements OnInit {

  idCatHome: string = '';
  listCat: Item[] | undefined;
  espaceJcms: JcmsEspace | undefined;
  videoLSF: string | undefined;

  constructor(
    private _catMng: CatsMngService,
    private _jcms: JAngularService,
    private _jcmsEspace: EspaceByLangService,
  ) {

    this.espaceJcms = this._jcmsEspace.getJcmsSpace();

    if (this.espaceJcms){
      this.idCatHome = this.espaceJcms.catHome;
    }
  }

  /**
   * Récupère les catégories enfant de la catégorie thématique
   */
  ngOnInit(): void {

    if (!this.espaceJcms) {
      return;
    }

    this._catMng.catsChildren(this.idCatHome).subscribe((cats: Category[]) => {

      if (!this.listCat) {
        this.listCat = [];
      }

      for (let ind = 0; ind < cats.length; ind++) {
        let c = cats[ind];
        this.listCat.splice(ind, 0, {
          img: buildUrlMedia(c.image),
          lbl: c.title,
          url: "themes/" + c.id,
        })
      }
    });

    //get la video lsf de la catégorie si elle existe
    this._jcms.get<Media>('search', {
      params: {
        types: 'Media',
        exactType: true,
        exactCat: true,
        cids: this.idCatHome,
        wrkspc:  this.espaceJcms.espace,
      }
    }).pipe(
      map((res : any) => {
        return res.dataSet;
      })
    )
    .subscribe((media: Media[]) => {
      if(media[0]) {
        this.videoLSF = buildUrlMedia(media[0].filename);
      }
    })

  }

  /**
   * Get la liste des catégories
   * @returns la liste de catégories
   */
  public getListCat() {
    return this.listCat;
  }

}
