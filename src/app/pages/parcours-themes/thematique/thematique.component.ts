import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
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
  cssClass="bg-color";

  mapParcours: ParcoursMap = new ParcoursMap();

  constructor(
    private _catMng: CatsMngService,
    private _route: ActivatedRoute,
    private _jcms: JAngularService) { }

  ngOnInit(): void {
    localStorage.removeItem('etape');


    let catThematique = this._route.snapshot.paramMap.get('id');

    if (!catThematique) {
      return;
    }
    if(!this.listParcours) {
      this.listParcours = [];
    }

    this._catMng.cat(catThematique).subscribe((cat) => {
      this.currentCat = cat;
    });

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
      for(let p of parcours) {
        this.listParcours?.push({
          lbl: p.title,
          url: 'parcours/' + p.id,
        })
      }
    });
  }

  public getListParcours() {
    return this.listParcours;
  }

  public getCurrentCat() {
    return this.currentCat;
  }
}
