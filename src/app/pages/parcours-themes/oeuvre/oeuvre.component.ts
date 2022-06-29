import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JAngularService } from 'j-angular';
import { forkJoin, map, Observable } from 'rxjs';
import { State } from 'src/app/components/etapes/etapes.component';
import { Content } from 'src/app/models/jcms/content';
import { OeuvreExplore } from 'src/app/models/jcms/OeuvreExplore';
import { Indication, IndicationMap } from 'src/app/models/jcms/indication';
import { ListeDeContenus } from 'src/app/models/jcms/listeDeContenus';

@Component({
  selector: 'app-oeuvre',
  templateUrl: './oeuvre.component.html',
  styleUrls: ['./oeuvre.component.scss']
})
export class OeuvreComponent implements OnInit {

  oeuvre: OeuvreExplore | undefined;
  indications: Indication[] | undefined;
  mapIndication: IndicationMap = new IndicationMap();

  hasLoaded: boolean = false;

  // key localStorage
  listEtape: string = "listEtape";
  idParcours: string = "idParcours";

  nextEtapeUrl: string | undefined;
  indexEtape: number = Number(this._route.snapshot.paramMap.get('index'));

  json: any | undefined;
  finParcours: boolean = false;

  audio: boolean = false;

  constructor(
    private _jcms: JAngularService,
    private router: Router,
    private _route: ActivatedRoute) { }

  /**
   * Initialise les étapes et l'oeuvre de la page
   */
  ngOnInit(): void {
    this.initEtape();
    this.initOeuvre();
  }

  /**
   * Récupère les données qui correspond à l'id de la page
   */
  private initOeuvre() {
    let idOeuvre = this._route.snapshot.paramMap.get('id');
    this._jcms.get<OeuvreExplore>('data/' + idOeuvre).subscribe(o => {
      this.oeuvre = o;

      //récupère les indications
      if (this.oeuvre.indications) {
        this._jcms.get<ListeDeContenus>('data/' + this.oeuvre.indications.id).subscribe((listeDeContenus: ListeDeContenus) => {
            this.getListContenus(listeDeContenus.contenus).subscribe(dataArray => {
              if (!this.indications) {
                this.indications = [];
              }
              for (let elem of dataArray) {
                let indication = this.mapIndication.mapToIndication(elem);
                this.indications.push(indication);
              }
            })
          });
      }
      this.hasLoaded = true;
    });
  }

  /**
   * Get le détail de la liste de contenus
   * @param contenus le contenus de la liste de contenus
   * @returns liste d'observable
   */
  private getListContenus(contenus: Content[]) {
    let observables: Observable<Indication>[] = [];
    for (let contenu of contenus) {
      observables.push(this._jcms.get<Indication>('data/' + contenu.id));
    }
    return forkJoin(observables);
  }

  /**
     * recupère les étapes dans le localStorage
     */
  private initEtape() {
    let etapeStore = localStorage.getItem(this.listEtape);
    if (etapeStore) {
      this.json = JSON.parse(etapeStore);
      this.setEtapeState(this.json, this.indexEtape);
      this.setNextStepUrl(this.json, this.indexEtape);
    }
  }

  /**
   * Update les états des étapes si besoin
   * @param json les étapes au format json
   * @param i l'index de l'étape
   */
  private setEtapeState(json: any, i: number) {
    if (json[i + 1] != undefined && json[i + 1].state == State.inactive) {
      json[i].state = State.passed;
      json[i + 1].state = State.active;
    } else if (json[i + 1] == undefined) {
      json[i].state = State.passed;
    }

    localStorage.setItem(this.listEtape, JSON.stringify(json));
  }

  /**
   * Récupère l'url de la prochaine étape ou renvoie à l'accueil de parcours
   * @param json les étapes au format json
   * @param i l'index de l'étape
   */
  private setNextStepUrl(json: any, i: number) {
    if (json[i + 1] != undefined) {
      this.nextEtapeUrl = json[i + 1].item.url;
    } else {
      this.finParcours = true;
      this.nextEtapeUrl = 'parcours-fin/' + localStorage.getItem(this.idParcours);
    }
  }

  /**
   * Get l'index de la prochaine étape pour l'affichage
   * @returns index de la prochaine
   */
  public getIndexNextStep() {
    return this.indexEtape + 2;
  }

  /**
   * Get le texte de l'avancé des étapes
   * @returns
   */
  public getTextEtape() {
    return "Etape " + (this.indexEtape + 1) + ' / ' + this.json.length;
  }

  /**
   * Retourne l'url de la page d'accueil du parcours
   * @returns l'url du parcours
   */
  public getHomeParcours() {
    return 'parcours/' + localStorage.getItem(this.idParcours);
  }

  /**
   * Set Audio a true si on a lancé l'audio de l'oeuvre
   * @param started l'audio est lancé ou non
   */
  public setAudio(started: boolean) {
    if (started)
      this.audio = true;
  }


  /**
   * Get le titre de l'oeuvre
   * @returns le titre
   */
  public getTitle() {
    return this.oeuvre?.title;
  }

  /**
   * Get le diaporama de l'oeuvre
   * @returns le diaporama
   */
  public getCarousel() {
    return this.oeuvre?.diaporama;
  }

  /**
   * Get l'id du diaporama
   * @returns l'id
   */
  public getCarouselId() {
    return this.oeuvre?.diaporama?.id;
  }

  /**
   * Get le fichier son de l'oeuvre
   * @returns le fichier son
   */
  public getAudio() {
    return this.oeuvre?.fichierSon;
  }

  /**
   * Get le fichier son d'aide de l'oeuvre
   * @returns le fichier son d'aide
   */
  public getAudioAide() {
    return this.oeuvre?.fichierSonDaide;
  }

  public getMap() {
    return localStorage.getItem("map");
  }

  public checkURL(url: string) {
    return (url.match(/\.(jpeg|jpg|gif|png|ico)$/) != null);
  }

}
