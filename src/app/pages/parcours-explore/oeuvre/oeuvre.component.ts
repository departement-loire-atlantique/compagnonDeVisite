import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JAngularService } from 'j-angular';
import { buildUrlMedia } from 'src/app/models/jcms/content';
import { Oeuvre } from 'src/app/models/jcms/Oeuvre';
import { Search, State } from '../explore/explore.component';

@Component({
  selector: 'app-oeuvre',
  templateUrl: './oeuvre.component.html',
  styleUrls: ['./oeuvre.component.scss']
})
/**
 * Affichage d'une oeuvre en mode "j'explore"
 */
export class OeuvreComponent implements OnInit, OnDestroy {

  oeuvre!: Oeuvre | undefined;
  isAudioEnded: boolean = false;
  result!: Search[];
  resultRetrieveKey: string = 'jsonExplore'
  resultRetrieve!: Search[];
  id!: string | '';

  constructor(
              private _route: ActivatedRoute,
              private _jcms: JAngularService, ) { }

  ngOnDestroy(): void {
    sessionStorage.removeItem('textExplore');
  }

  ngOnInit(): void {
    this._route.paramMap.subscribe((params) => {
      this.id = params.get('id') || '';
      this._jcms
        .get<Oeuvre>('data/' + this.id)
        .subscribe((oeuvre: Oeuvre) => {
          this.oeuvre = oeuvre;
          this.oeuvre.fichierSon = buildUrlMedia(oeuvre.fichierSon);
          this.oeuvre.fichierSonDaide = buildUrlMedia(oeuvre.fichierSonDaide);
          this.oeuvre.vignette = buildUrlMedia(oeuvre.vignette);
          this.oeuvre.plan = buildUrlMedia(oeuvre.plan);
      });
    });

    // MAJ du local storage
    var resultRetrieveSessionStorage = sessionStorage.getItem(this.resultRetrieveKey) ? JSON.parse(sessionStorage.getItem(this.resultRetrieveKey) || '') : '';
    if (resultRetrieveSessionStorage !== '') {
      this.result = resultRetrieveSessionStorage;
      for (let item of this.result[0].searchItem) {
        if (item.item.url?.includes(this.id)){
          item.state = State.passed;
          sessionStorage.setItem(this.resultRetrieveKey, JSON.stringify(this.result));
          break;
        }
      }
    }
  }

  /**
   * Détection fin audio
   * @param event
   */
  public changeAudioEnd(event: any) {
    this.isAudioEnded = event;
  }

  /**
   * Get le plan du parcours
   * @returns la plan
   */
  public getPlan() {
    return this.oeuvre?.plan;
  }

  /**
   * Get l'id de la video LSF
   * @returns l'id de la video
   */
  public getVideo() {
    return this.oeuvre?.video;
  }
}
