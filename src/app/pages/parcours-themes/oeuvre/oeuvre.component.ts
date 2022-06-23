import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JAngularService } from 'j-angular';
import { State } from 'src/app/components/etapes/etapes.component';
import { OeuvreExplore } from 'src/app/models/jcms/OeuvreExplore';

@Component({
  selector: 'app-oeuvre',
  templateUrl: './oeuvre.component.html',
  styleUrls: ['./oeuvre.component.scss']
})
export class OeuvreComponent implements OnInit {

  oeuvre: OeuvreExplore | undefined;

  hasLoaded: boolean = false;

  listEtape: string = "listEtape";
  idParcours: string = "idParcours";

  nextEtapeUrl: string | undefined;
  indexEtape: number = Number(this._route.snapshot.paramMap.get('index'));

  json:any|undefined;
  finParcours:boolean = false;

  constructor(
    private _jcms: JAngularService,
    private router: Router,
    private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this.initEtape();
    this.initOeuvre();
  }

  private initOeuvre() {
    let idOeuvre = this._route.snapshot.paramMap.get('id');
    this._jcms.get<OeuvreExplore>('data/' + idOeuvre).subscribe(o => {
      this.oeuvre = o;
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

  private setNextStepUrl(json: any, i: number) {
    if(json[i+1] != undefined) {
      this.nextEtapeUrl = json[i+1].item.url;
    } else {
      this.finParcours = true;
      this.nextEtapeUrl = 'parcours/' + localStorage.getItem(this.idParcours);
    }
  }

  public getTitle() {
    return this.oeuvre?.title;
  }

  public getCarousel() {
    return this.oeuvre?.diaporama;
  }

  public getCarouselId() {
    return this.oeuvre?.diaporama?.id;
  }

  public getAudio() {
    return this.oeuvre?.fichierSon;
  }

  public getAudioAide() {
    return this.oeuvre?.fichierSonDaide;
  }

  public getIndexNextStep() {
    return this.indexEtape + 2;
  }

  public getTextEtape() {
    return "Etape " + (this.indexEtape+1) + ' / ' + this.json.length;
  }

}
