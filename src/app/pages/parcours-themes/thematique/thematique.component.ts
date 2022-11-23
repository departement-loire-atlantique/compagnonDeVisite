import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JAngularService } from 'j-angular';
import { map } from 'rxjs';
import { Item } from 'src/app/models/item';
import { Category } from 'src/app/models/jcms/category';
import { Parcours, ParcoursMap } from 'src/app/models/jcms/parcours';
import { CatsMngService } from 'src/app/services/cats-mng.service';
import { EspaceByLangService } from 'src/app/services/espace-by-lang.service';
import { Media } from 'src/app/models/jcms/media';
import { buildUrlMedia } from 'src/app/models/jcms/content';

@Component({
  selector: 'app-thematique',
  templateUrl: './thematique.component.html',
  styleUrls: ['./thematique.component.scss']
})
export class ThematiqueComponent implements OnInit {

  currentCat: Category | undefined;
  listParcours: Item[] | undefined;
  videoLSF: string | undefined;

  mapParcours: ParcoursMap = new ParcoursMap();

  idThematique: string = "idThematique";

  constructor(
    private _catMng: CatsMngService,
    private _route: ActivatedRoute,
    private _jcms: JAngularService,
    private _jcmsEspace: EspaceByLangService,
  ) { }

  /**
   * Recupère la thématique et les différents parcours associés
   * @returns
   */
  ngOnInit(): void {
    const espaceJcms = this._jcmsEspace.getJcmsSpace();


    let thematiqueId = this._route.snapshot.paramMap.get('id');
    if(thematiqueId)
      localStorage.setItem(this.idThematique, thematiqueId);

    if(!espaceJcms){
      return;
    }

    let catThematique = this._route.snapshot.paramMap.get('id');

    if (!catThematique) {
      return;
    }
    if (!this.listParcours) {
      this.listParcours = [];
    }

    //get la thématique
    this._catMng.cat(catThematique).subscribe((cat) => {
      this.currentCat = cat;
    });

    //get les parcours
    this._jcms.get<Parcours>('search', {
      params: {
        types: 'Parcours',
        exactType: true,
        cids: catThematique,
        wrkspc: espaceJcms.espace,
      }
    }).pipe(
      map((rep: any) =>
        rep.dataSet.map((itData: any): Parcours => this.mapParcours.mapToParcours(itData))
      )
    ).subscribe((parcours: Parcours[]) => {
      parcours.sort((a,b) => a.ordre - b.ordre);
      for (let ind in parcours) {
        let p = parcours[ind];
        if (p.jexplore) {
          sessionStorage.removeItem('jsonExplore');
          sessionStorage.removeItem('jsonExploreAll');
          localStorage.setItem("IdJExplore", p.id);
          this.listParcours?.splice(-1,0,{
            lbl: p.title,
            url: 'explore/',
            isJExplore: true,
          })
        } else {
          this.listParcours?.splice(Number(ind),0,{
            lbl: p.title,
            url: 'parcours/' + p.id,
          })
        }
      }
    });

    //get la video lsf de la catégorie si elle existe
    let espace = this._jcmsEspace.getJcmsSpace()?.espace;
    if(espace) {
      this._jcms.get<Media>('search', {
        params: {
          types: 'Media',
          exactType: true,
          exactCat: true,
          cids: catThematique,
          wrkspc:  espace,
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
  }

  /**
   * Get la liste des parcours
   * @returns la liste de parcours
   */
  public getListParcours() {
    return this.listParcours;
  }

  /**
   * Get la cat de la thématique
   * @returns la current cat
   */
  public getCurrentCat() {
    return this.currentCat;
  }
}
