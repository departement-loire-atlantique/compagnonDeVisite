import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JAngularService } from 'j-angular';
import { State } from 'src/app/components/etapes/etapes.component';
import { buildUrlMedia } from 'src/app/models/jcms/content';
import { Oeuvre, OeuvreMap } from 'src/app/models/jcms/Oeuvre';
import { Steps } from 'src/app/components/oeuvre-suiv-pred/oeuvre-suiv-pred.component';

@Component({
  selector: 'app-oeuvre',
  templateUrl: './oeuvre.component.html',
  styleUrls: ['./oeuvre.component.scss']
})
export class OeuvreComponent implements OnInit {

  mapOeuvre: OeuvreMap = new OeuvreMap();
  oeuvre: Oeuvre | undefined;
  indications: string | undefined;

  hasLoaded: boolean = false;

  // key localStorage
  listEtape: string = "listEtape";
  idParcours: string = "idParcours";

  nextEtapeUrl: string | undefined;
  previousEtapeUrl: string | undefined;
  indexEtape: number = Number(this._route.snapshot.paramMap.get('index'));

  json: any | undefined;
  finParcours: boolean = false;
  debParcours: boolean = true;

  audio: boolean = false;

  constructor(
    private _jcms: JAngularService,
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
    this._jcms.get<Oeuvre>('data/' + idOeuvre).subscribe(o => {
      this.oeuvre = this.mapOeuvre.mapToOeuvre(o);

      this.hasLoaded = true;
    });
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
    if (json[i - 1] != undefined) {
      this.previousEtapeUrl = json[i - 1].item.url;
      this.debParcours = false;
    } else {
      this.debParcours = true;
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
   * Get l'index de l'étape précédente pour l'affichage
   * @returns index de la précédente
   */
  public getIndexPreviousStep() {
    return this.indexEtape;
  }

  /**
   * Get les paramètres pour le bandeau suivant/précédent de l'oeuvre
   * @returns les steps
   */
  public getSteps(): Steps {
    return {
      debParcours: this.debParcours,
      finParcours: this.finParcours,
      nextStepUrl: this.nextEtapeUrl ? this.nextEtapeUrl : "",
      previousStepUrl: this.previousEtapeUrl ? this.previousEtapeUrl : "",
      indexNextStep: this.getIndexNextStep(),
      indexPreviousStep: this.getIndexPreviousStep()
    }
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
   * Get la description de l'oeuvre
   * @returns la description
   */
  public getDesc() {
    return this.oeuvre?.description;
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
    if (this.oeuvre?.fichierSonDaide) {
      return this.oeuvre?.fichierSonDaide;
    }
    return "";
  }

  /**
   * Get la carte de l'oeuvre
   * @returns la carte de l'oeuvre
   */
  public getMap() {
    return this.oeuvre?.plan;
    // return localStorage.getItem("map");
  }

  /**
   * Get les indications de l'oeuvre
   * @returns les indications de l'oeuvre
   */
  public getIndications() {
    return this.oeuvre?.indications;
  }

  /**
   * Get l'id de la video LSF
   * @returns l'id de la video
   */
  public getVideo() {
    return this.oeuvre?.video;
  }

}
