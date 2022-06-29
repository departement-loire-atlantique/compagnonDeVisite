import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JAngularService } from 'j-angular';
import { map } from 'rxjs';
import { Item } from 'src/app/models/item';
import { Category } from 'src/app/models/jcms/category';
import { Parcours, ParcoursMap } from 'src/app/models/jcms/parcours';
import { CatsMngService } from 'src/app/services/cats-mng.service';
import { EspaceByLangService } from 'src/app/services/espace-by-lang.service';

@Component({
  selector: 'app-thematique',
  templateUrl: './thematique.component.html',
  styleUrls: ['./thematique.component.scss']
})
export class ThematiqueComponent implements OnInit {

  currentCat: Category | undefined;
  listParcours: Item[] | undefined

  mapParcours: ParcoursMap = new ParcoursMap();

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
      for (let p of parcours) {
        this.listParcours?.push({
          lbl: p.title,
          url: p.jexplore ? 'explore/' : 'parcours/' + p.id,
        })
      }
    });
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
