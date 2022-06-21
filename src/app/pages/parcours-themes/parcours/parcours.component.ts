import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JAngularService } from 'j-angular';
import { Parcours, ParcoursMap } from 'src/app/models/jcms/parcours';
import { Etape, State } from 'src/app/components/etapes/etapes.component';
import { environment } from 'src/environments/environment';
import { Item } from 'src/app/models/item';
import { ListeDeContenus } from 'src/app/models/jcms/listeDeContenus';
import { Jexplore } from 'src/app/models/jcms/jexplore';
import { Observable, forkJoin } from 'rxjs';
import { DesignSystemService } from 'src/app/services/design-system.service';

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

  keyEtape: string = "etape";
  keyName: string = "nameParcours";

  constructor(
    private _ds: DesignSystemService,
    private _route: ActivatedRoute,
    private _jcms: JAngularService) { }

  /**
   * init le parcours et les etapes si elles ne sont pas dans le localStorage
   */
  ngOnInit(): void {
    this._ds.initOverlay();

    let parcoursId = this._route.snapshot.paramMap.get('id');

    if (!parcoursId) {
      return;
    }

    //get les infos du parcours en paramètre
    this._jcms.get<Parcours>('data/' + parcoursId).subscribe((parcours: Parcours) => {
      this.leParcours = this.mapParcours.mapToParcours(parcours);

      //recup les info dans le localStorage
      let nameStore = localStorage.getItem(this.keyName);
      let etapeStore = localStorage.getItem(this.keyEtape);
      if (etapeStore && nameStore == this.leParcours.title) {
        this.etapes = JSON.parse(etapeStore);
      } else {
        this.initEtape(this.leParcours.etapes.id);
      }
    });
  }

  /**
   * initialise les étapes du parcours
   * @param etapeId l'id de la liste de contenus avec les étapes du parcours
   */
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

          //ajoute les items (tuile horizontale)
          this.items.push({
            lbl: c.title,
            img: environment.jcms + c.visuel,
            url: "/oeuvre/" + ind + "/" + c.id,
          });

          //ajoute les étapes (menu étapes)
          let item = this.items[ind];
          this.etapes.push({
            item: item,
            state: Number(ind) == 0 ? State.active : State.inactive,
          })
        }

        //store les étapes dans le localStorage
        this.storeEtapes();
      });
    });
  }

  /**
   * Get la liste d'observable de toutes les étapes
   * @param contenus la liste de contenus du parcours
   * @returns la liste d'observable
   */
  private getListContenus(contenus: Jexplore[]) {
    let observables: Observable<Jexplore>[] = [];
    for (let contenu of contenus) {
      observables.push(this._jcms.get<Jexplore>('data/' + contenu.id));
    }
    return forkJoin(observables);
  }

  /**
   * Store les étapes au format json dans le localStorage
   */
  public storeEtapes() {
    if (this.etapes) {
      let str = JSON.stringify(this.etapes);
      localStorage.setItem(this.keyEtape, str);
      localStorage.setItem(this.keyName, this.getTitle());
    }
  }

  /**
   * Get le title du parcours
   * @returns le title du parcours
   */
  public getTitle() {
    if (!this.leParcours)
      return "";

    return this.leParcours.title;
  }

  /**
   * Get la description du parcours
   * @returns la description
   */
  public getDescription() {
    if (!this.leParcours)
      return "";

    return this.leParcours.description;
  }

  /**
   * Get le plan du parcours
   * @returns la plan
   */
  public getPlan() {
    if (!this.leParcours)
      return "";

    return this.leParcours.plan;
  }

  /**
   * Get la durée du parcours
   * @returns la durée du parcours convertit
   */
  public getDuree() {
    if (!this.leParcours)
      return "";

    return this.convertTime(this.leParcours.duree);
  }

  /**
   * Convertit le temps(secondes) en minutes ou heures
   * @param duree la durée du parcours en seconde
   * @returns le temps en heures ou minutes
   */
  private convertTime(duree: number) {
    let heure = duree / 3600; //temps en heure

    if (heure < 1)
      return duree / 60 + " minutes"; //temps en min
    else if (heure == 1)
     return heure + " heure";

    return heure + " heures";
  }

  /**
   * Get les items qui ont été vu par l'utilisateur
   * @returns la liste d'items (qui ne sont pas à l'état inactive)
   */
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

  /**
   * Get les étapes
   * @returns les étapes
   */
  public getEtapes() {
    return this.etapes;
  }

}
