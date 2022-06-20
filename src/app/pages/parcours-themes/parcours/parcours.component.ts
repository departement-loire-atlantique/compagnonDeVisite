import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JAngularService } from 'j-angular';
import { Parcours, ParcoursMap } from 'src/app/models/jcms/parcours';
import { Tuile } from 'src/app/components/tuile-v/tuile-v.component';
import { Etape, State } from 'src/app/components/etapes/etapes.component';
import { environment } from 'src/environments/environment';
import { Item } from 'src/app/models/item';
import { ListeDeContenus } from 'src/app/models/jcms/listeDeContenus';
import { Jexplore } from 'src/app/models/jcms/jexplore';
import { Observable, forkJoin } from 'rxjs';

@Component({
  selector: 'app-parcours',
  templateUrl: './parcours.component.html',
  styleUrls: ['./parcours.component.scss']
})
export class ParcoursComponent implements OnInit {

  mapParcours: ParcoursMap = new ParcoursMap();
  leParcours: Parcours | undefined;

  items: Item[] | undefined;

  constructor(
    private _route: ActivatedRoute,
    private _jcms: JAngularService) {}

  ngOnInit(): void {
    let parcoursId = this._route.snapshot.paramMap.get('id');

    if (!parcoursId) {
      return;
    }

    this._jcms.get<Parcours>('data/' + parcoursId).subscribe((parcours: Parcours) => {
      this.leParcours = this.mapParcours.mapToParcours(parcours);

      this._jcms.get<ListeDeContenus>('data/' + this.leParcours.etapes.id).subscribe((listeDeContenus: ListeDeContenus) => {
        this.getListContenus(listeDeContenus.contenu).subscribe(dataArray => {
          if(!this.items) {
              this.items = [];
            }
          for(let c of dataArray) {
            this.items.push({
              lbl: c.title,
              img: environment.jcms + c.visuel,
              url:"/oeuvre/" + c.id,
            });
          }
        });

      });

    });
  }

  private getListContenus(contenus: Jexplore[]) {
    let observables: Observable<Jexplore>[] = [];
    for (let contenu of contenus) {
      observables.push(this._jcms.get<Jexplore>('data/' + contenu.id));
    }
    return forkJoin(observables);
  }

  public getTitle() {
    if (!this.leParcours)
      return "";

    return this.leParcours.title;
  }

  public getDuree() {
    if (!this.leParcours)
      return "";

    return this.convertTime(this.leParcours.duree);
  }

  private convertTime(duree: number) { //améliorer pour faire XXh xxmin
    let heure = duree / 3600; //temps en heure
    if(heure < 1)
      return duree/60 + " min"; //temps en min
    return heure + " h";
  }

  public getEtapes() {
    let etapes:Etape[] = [];
    if(this.items) {
      for(let item of this.items) {
        if(item.url) {
          etapes.push({
            url: item.url,
            state: State.inactive,
          })
        }
      }
    }
    return etapes;
  }

  public getItems() {
    return this.items;
  }


}
