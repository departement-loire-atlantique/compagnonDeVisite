import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { JAngularService } from 'j-angular';
import { Category } from 'src/app/models/jcms/category';
import { Parcours, ParcoursMap } from 'src/app/models/jcms/parcours';
import { Item } from 'src/app/models/item'
import { CatsMngService } from 'src/app/services/cats-mng.service';

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
    private _jcms: JAngularService) { }

  /**
   * Recupère la thématique et les différents parcours associés
   * @returns
   */
  ngOnInit(): void {;

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
      }
    }).pipe(
      map((rep: any) =>
        rep.dataSet.map((itData: any): Parcours => this.mapParcours.mapToParcours(itData))
      )
    ).subscribe((parcours: Parcours[]) => {
      parcours.sort((a,b) => a.ordre - b.ordre);
      for (let ind in parcours) {
        let p = parcours[ind];
        this.listParcours?.splice(Number(ind),0,{
          lbl: p.title,
          url: 'parcours/' + p.id,
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
