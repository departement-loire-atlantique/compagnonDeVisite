import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
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
  listParcoursPMR: Item[] = [];
  listParcoursNoPMR: Item[] = [];
  isPMR!: boolean;
  videoLSF: string | undefined;
  transcription?: string;
  isLSF!: boolean;

  mapParcours: ParcoursMap = new ParcoursMap();

  idThematique: string = "idThematique";

  constructor(
    @Inject(LOCALE_ID) public locale: string,
    private _catMng: CatsMngService,
    private _activatedRoute: ActivatedRoute,
    private _jcms: JAngularService,
    private _jcmsEspace: EspaceByLangService,
  ) { }

  /**
   * Recupère la thématique et les différents parcours associés
   * @returns
   */
  ngOnInit(): void {

    this.isLSF = this.locale === 'lsf' ? true : false;

    this.isPMR = sessionStorage.getItem("isPMR") === 'true' ? true : false;

    const espaceJcms = this._jcmsEspace.getJcmsSpace();


    let thematiqueId = this._activatedRoute.snapshot.paramMap.get('id');
    if (thematiqueId)
      localStorage.setItem(this.idThematique, thematiqueId);

    if (!espaceJcms) {
      return;
    }

    let catThematique = this._activatedRoute.snapshot.paramMap.get('id');

    if (!catThematique) {
      return;
    }
    if (!this.listParcours) {
      this.listParcours = [];
    }

    //get la thématique
    this._catMng.cat(catThematique)
      .subscribe((cat) => {
        this.currentCat = cat;
        this.transcription = cat.videoLsfTranscription;
        if (cat.videoLsf) {

          this._jcms.get<any>('data/' + cat.videoLsf,)
            .subscribe((media: Media) => {
              if (media) {
                this.videoLSF = buildUrlMedia(media.filename);
              }
            });
        }
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
      parcours.sort((a, b) => a.ordre - b.ordre);
      for (let ind in parcours) {
        let p = parcours[ind];
        if (p.jexplore) {
          sessionStorage.removeItem('jsonExplore');
          sessionStorage.removeItem('jsonExploreAll');
          localStorage.setItem("IdJExplore", p.id);
          this.listParcours?.splice(-1, 0, {
            lbl: this.getTitle(p),
            url: 'explore/',
            isJExplore: true,
          })
        } else {
          this.listParcours?.splice(Number(ind), 0, {
            lbl: this.getTitle(p),
            url: 'parcours/' + p.id,
            parcoursPMR: p.parcoursPMR,
          })
        }
      }

      /** Gestion PMR */
      this.listParcours?.forEach((currentValue, index) => {
        if (currentValue.isJExplore) {
          this.listParcoursPMR.push(currentValue);
          this.listParcoursNoPMR.push(currentValue);
          return;
        }
        if (currentValue.parcoursPMR) {
          this.listParcoursPMR.push(currentValue);
        } else {
          this.listParcoursNoPMR.push(currentValue);
        }
      });
    });
  }

  /**
   * Get le title du parcours
   */
  public getTitle(parcours: Parcours) {
    return parcours.titreAffiche ? parcours.titreAffiche : parcours.title;
  }

  /**
   * Toggle PMR
   */
  public doIsPMR(isPMR: string) {
    sessionStorage.setItem("isPMR", isPMR);
    this.isPMR = isPMR === 'true' ? true : false;
  }

  /**
   * Get la liste des parcours
   * @returns la liste de parcours
   */
  public getListParcours() {
    if (this.isLSF)
      return this.listParcours;
    return this.isPMR ? this.listParcoursPMR : this.listParcoursNoPMR;
  }

  /**
   *
   * @returns Présence parcours PMR
   */
  public isNotEmptyParcoursPMR() {
    if(this.listParcoursPMR.length) return true;
    return false;
  }

  /**
   * Get la cat de la thématique
   * @returns la current cat
   */
  public getCurrentCat() {
    return this.currentCat;
  }

  /**
   * Get l'url de retour
   */
  public getURLBack() {
    return '/themes';
  }

  /**
   * get label bouton
   */
  public getLabelBtn() {
    return $localize`:@@BackComp-accueil:Retour à l\'accueil`;
  }
}
