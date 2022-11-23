import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JAngularService } from 'j-angular';
import { Parcours, ParcoursMap } from 'src/app/models/jcms/parcours';
import { Etape, State } from 'src/app/components/etapes/etapes.component';
import { environment } from 'src/environments/environment';
import { Item } from 'src/app/models/item';
import { ListeDeContenus } from 'src/app/models/jcms/listeDeContenus';
import { Observable, forkJoin } from 'rxjs';
import { DesignSystemService } from 'src/app/services/design-system.service';
import { Oeuvre } from 'src/app/models/jcms/Oeuvre';
import { Content } from 'src/app/models/jcms/content';

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

  //key localStorage
  listEtape: string = "listEtape";
  idParcours: string = "idParcours";
  idThematique: string = "idThematique";

  //template
  defaultCSS = "max-lines";
  defaultText = $localize`:@@ParcoursComp-more:Lire la suite`;
  step: string = $localize`:@@ParcoursComp-step:Etape`;

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
      let idParcoursStore = localStorage.getItem(this.idParcours);
      let etapeStore = localStorage.getItem(this.listEtape);
      if (etapeStore && idParcoursStore == this.leParcours.id) {
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
      this.getListContenus(listeDeContenus.contenus).subscribe(dataArray => {

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
            img: environment.jcms + c.vignette,
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
  private getListContenus(contenus: Content[]) {
    let observables: Observable<Oeuvre>[] = [];
    for (let contenu of contenus) {
      observables.push(this._jcms.get<Oeuvre>('data/' + contenu.id));
    }
    return forkJoin(observables);
  }

  /**
   * Store les étapes au format json dans le localStorage
   */
  public storeEtapes() {
    if (this.etapes && this.leParcours?.id) {
      let str = JSON.stringify(this.etapes);
      localStorage.setItem(this.listEtape, str);
      localStorage.setItem(this.idParcours, this.leParcours.id);
    }
  }

  /**
   * Get les items qui ont été vu par l'utilisateur
   * @returns la liste d'items (qui ne sont pas à l'état inactive)
   */
  public getSeenItems() {
    let seenItem = [];
    if(this.etapes) {
      for(let etape of this.etapes) {
        if (!(etape.state == State.inactive))
          seenItem.push(etape.item);
      }
    }
    return seenItem;
  }

  /**
   * Get les items du parcours
   * @returns la liste d'items
   */
  public getItems() {
    let items = [];
    if (this.etapes) {
      for (let etape of this.etapes) {
        items.push(etape.item);
      }
    }
    return items;
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
   * Get l'url pour retourner à la liste des parcours d'un thème
   * @returns
   */
  public getThemeURL() {
    let idTheme = localStorage.getItem(this.idThematique);
    return 'themes/' + idTheme;
  }


  /* GETTER PARCOURS */
  /**
   * Get le title du parcours
   * @returns le title du parcours
   */
   public getTitle() {
    return this.leParcours?.title;
  }

  /**
   * Get la description du parcours
   * @returns la description
   */
  public getDescription() {
    return this.leParcours?.description;
  }

  /**
   * Get le plan du parcours
   * @returns la plan
   */
  public getPlan() {
    return this.leParcours?.plan;
  }

  /**
   * Get l'id de la video LSF
   * @returns l'id de la video
   */
  public getVideo() {
    return this.leParcours?.video;
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


  /* GETTER ETAPE */
  /**
   * Get les étapes
   * @returns les étapes
   */
   public getEtapes() {
    return this.etapes;
  }

  /**
   * Get le nombre d'oeuvre dans le parcours
   * @returns le nombre d'items
   */
  public getNumberItem() {
    return this.etapes?.length;
  }

  /**
   * Get le nombre d'oeuvre vu du parcours
   * @returns le nombre d'items vu
   */
  public getNumberSeenItem() {
    return this.getSeenItems().length;
  }


  /* CSS */
  /**
   * Change les classes CSS lors d'un click bouton
   */
   public showDesc() {
    if(this.defaultCSS === "max-lines") {
      this.defaultCSS = "default-lines ";
      this.defaultText = $localize`:@@ParcoursComp-less:Réduire`;
    } else {
      this.defaultCSS = "max-lines";
      this.defaultText = $localize`:@@ParcoursComp-more:Lire la suite`;
    }
  }

  /**
   * Retourne la classe css
   * @returns la classe css
   */
  public getCSS() {
    return this.defaultCSS;
  }

  /**
   * get label bouton
   */
   public getLabelBtn() {
    return $localize`:@@BackComp-parcours:Retour aux parcours`;
  }

}
