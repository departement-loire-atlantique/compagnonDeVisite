import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JAngularService } from 'j-angular';
import { State } from 'src/app/components/etapes/etapes.component';
import { Oeuvre, OeuvreMap } from 'src/app/models/jcms/Oeuvre';
import { Steps } from 'src/app/components/oeuvre-suiv-pred/oeuvre-suiv-pred.component';

@Component({
  selector: 'app-oeuvre',
  templateUrl: './oeuvre.component.html',
  styleUrls: ['./oeuvre.component.scss']
})
export class OeuvreComponent implements OnInit, AfterViewInit, OnDestroy {

  mapOeuvre: OeuvreMap = new OeuvreMap();
  oeuvre: Oeuvre | undefined;
  indications: string | undefined;

  hasLoaded: boolean = false;

  //template
  defaultCSS = "max-lines";
  defaultText = $localize`:@@ParcoursComp-more:Voir plus`;

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

  step: string = $localize`:@@OeuvreComp-step:Etape`;

  isIndicationsScrolledIntoView: boolean = true;

  constructor(
    private _jcms: JAngularService,
    private _route: ActivatedRoute,
    private router: Router
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
  }

  /**
   * Initialise les étapes et l'oeuvre de la page
   */
  ngOnInit(): void {
    this.initEtape();
    this.initOeuvre();
  }

  /**
   * Permet de detecter si les indications sont visibles ou non
   * pour afficher le bouton comment m'y rendre
   */
  private _observer: IntersectionObserver | undefined;
  ngAfterViewInit() {
    const el: HTMLElement | null = document.getElementById('indications');
    if(el) {
      this._observer = new IntersectionObserver(this._callback);
      this._observer.observe(el);
    }
  }

  ngOnDestroy() {
    if(this._observer)
      this._observer.disconnect();
  }

  private _callback = (entries:any) => {
    entries.forEach((entry:any) => {
      if(entry.isIntersecting) {
        this.isIndicationsScrolledIntoView = true;
      } else {
        this.isIndicationsScrolledIntoView = false;
      }
    });
  };


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
   * Get le texte de l'avancé des étapes
   * @returns
   */
  public getTextEtape() {
    return this.step + " " + (this.indexEtape + 1) + ' / ' + this.json.length;
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


  /* GESTION ETAPES */
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
      this.nextEtapeUrl = '/parcours-fin/' + localStorage.getItem(this.idParcours);
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
   * @returns true si l'oeuvre à des indications
   * pour le bouton comment m'y rendre
   */
  public isIndications() {
    if(this.getAudioAide() || this.getMap() || this.getIndications()) {
      return true;
    }
    return false;
  }



  /* GETTER OEUVRE */
  /**
   * Get le titre de l'oeuvre
   * @returns le titre
   */
  public getTitle() {
    return this.oeuvre?.titreAffiche ? this.oeuvre?.titreAffiche : this.oeuvre?.title;
  }

  /**
   * Get le titre court de l'oeuvre
   * @returns le titre
   */
  public getShortTitle() {
    return this.oeuvre?.titreCourt;
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
    return this.oeuvre?.fichierSonDaide;
  }

  /**
   * Get la carte de l'oeuvre
   * @returns la carte de l'oeuvre
   */
  public getMap() {
    return this.oeuvre?.plan;
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

  /**
   * getLocation for cartel
   */
  public getLocation() {
    return this.oeuvre?.localisation || '';
  }

  /**
   * get label bouton
   */
   public getLabelBtn() {
    return $localize`:@@BackComp-liste:Retour à la liste`;
  }

  /* CSS */
  /**
   * Change les classes CSS lors d'un click bouton
   */
   public showDesc() {
    if(this.defaultCSS === "max-lines") {
      this.defaultCSS = "default-lines ";
      this.defaultText = $localize`:@@ParcoursComp-less:Voir moins`;
    } else {
      this.defaultCSS = "max-lines";
      this.defaultText = $localize`:@@ParcoursComp-more:Voir plus`;
    }
  }

  /**
   * Retourne la classe css
   * @returns la classe css
   */
     public getCSS() {
      return this.defaultCSS;
    }

}
