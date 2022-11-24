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
import { Router } from '@angular/router';

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
  transcription?: string;

  constructor(
    private _catMng: CatsMngService,
    private _jcms: JAngularService,
    private _jcmsEspace: EspaceByLangService,
    private _router: Router,
  ) {

    this.espaceJcms = this._jcmsEspace.getJcmsSpace();

    if (this.espaceJcms) {
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

      cats.forEach((currentValue, index) => {
        if (currentValue.afficheExpo === 'false') {
          cats.splice(index, 1);
        }
      });

      if (cats.length === 1) {
        let url = "/themes/" + cats[0].id;
        if (sessionStorage.getItem("backURL")?.includes("themes")) {
          url = "/";
          sessionStorage.removeItem("backURL");
        }
        this._router.navigate([url]);
      }

      for (let ind = 0; ind < cats.length; ind++) {
        let c = cats[ind];
        this.listCat.splice(ind, 0, {
          img: buildUrlMedia(c.image),
          lbl: c.title,
          url: "/themes/" + c.id,
        })
      }
    });

    this._catMng.cat(this.idCatHome)
      .subscribe((cat) => {
        this.transcription = cat.videoLsfTranscription;
        if (cat.videoLsf) {

          this._jcms.get<any>('data/' + cat.videoLsf,)
            .subscribe((media: Media) => {
              console.log(media);
              if (media) {
                this.videoLSF = buildUrlMedia(media.filename);
              }
            });
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
