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
  etapes: Etape[] | undefined;

  key: string = "etape";

  constructor(
    private _route: ActivatedRoute,
    private _jcms: JAngularService) { }

  /**
   * init le parcours et les etapes si elles ne sont pas dans le localStorage
   */
  ngOnInit(): void {

    let parcoursId = this._route.snapshot.paramMap.get('id');

    if (!parcoursId) {
      return;
    }

    this._jcms.get<Parcours>('data/' + parcoursId).subscribe((parcours: Parcours) => {
      this.leParcours = this.mapParcours.mapToParcours(parcours);

      let etapeStore = localStorage.getItem(this.key);
      if (etapeStore) {
        this.etapes = JSON.parse(etapeStore);
      } else {
        this.initEtape(this.leParcours.etapes.id);
      }
    });
  }

  private initEtape(etapeId: string) {

    this._jcms.get<ListeDeContenus>('data/' + etapeId).subscribe((listeDeContenus: ListeDeContenus) => {
      this.getListContenus(listeDeContenus.contenu).subscribe(dataArray => {
        if (!this.items) {
          this.items = [];
        }
        if (!this.etapes) {
          this.etapes = [];
        }
        for (let ind in dataArray) {
          let c = dataArray[ind];
          this.items.push({
            lbl: c.title,
            img: environment.jcms + c.visuel,
            url: "/oeuvre/" + ind + "/" + c.id,
          });

          let item = this.items[ind];
          this.etapes.push({
            item: item,
            state: Number(ind) == 0 ? State.active : State.inactive,
          })
        }
        this.storeEtapes();
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

  public storeEtapes() {
    if (this.etapes) {
      let str = JSON.stringify(this.etapes);
      localStorage.setItem(this.key, str);
    }
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
    if (heure < 1)
      return duree / 60 + " min"; //temps en min
    return heure + " h";
  }

  public getSeenItems() {
    let seenItem = [];
    let listEtape = this.etapes?.filter(e => {
      if (e.state == State.inactive)
        return false;
      return true;
    });
    if (listEtape) {
      for (let etape of listEtape) {
        seenItem.push(etape.item);
      }
    }
    return seenItem;
  }

  public getEtapes() {
    return this.etapes;
  }

  public getItems() {
    return this.items;
  }
}
