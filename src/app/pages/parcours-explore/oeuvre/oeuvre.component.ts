import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JAngularService } from 'j-angular';
import { buildUrlMedia } from 'src/app/models/jcms/content';
import { Oeuvre, OeuvreMap } from 'src/app/models/jcms/Oeuvre';
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
  mapOeuvre: OeuvreMap = new OeuvreMap();

  isAudioEnded: boolean = false;
  result!: Search[];
  resultRetrieveKey: string = 'jsonExplore'
  resultAllRetrieveKey: string = 'jsonExploreAll'
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
          this.oeuvre = this.mapOeuvre.mapToOeuvre(oeuvre);
      });
    });

    // MAJ du local storage
    if (sessionStorage.getItem(this.resultRetrieveKey))
      this.changeLocalStorage(this.resultRetrieveKey);

    if (sessionStorage.getItem(this.resultAllRetrieveKey))
      this.changeLocalStorage(this.resultAllRetrieveKey);
  }

  /**
   * MAJ du local storage
   */
  private changeLocalStorage(key: string) {
    var resultRetrieveSessionStorage = sessionStorage.getItem(key) ? JSON.parse(sessionStorage.getItem(key) || '') : '';
    if (resultRetrieveSessionStorage !== '') {
      this.result = resultRetrieveSessionStorage;
      for (let item of this.result[0].searchItem) {
        if (item && item.item.url?.includes(this.id)){
          item.state = State.passed;
          sessionStorage.setItem(key, JSON.stringify(this.result));
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
