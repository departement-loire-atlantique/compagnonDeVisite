import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JAngularService } from 'j-angular';
import { buildUrlMedia } from 'src/app/models/jcms/content';
import { Oeuvre } from 'src/app/models/jcms/Oeuvre';

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

  constructor(
              private _route: ActivatedRoute,
              private _jcms: JAngularService, ) { }

  ngOnDestroy(): void {
    sessionStorage.removeItem('textExplore');
  }

  ngOnInit(): void {
    this._route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this._jcms
          .get<Oeuvre>('data/' + id)
          .subscribe((oeuvre: Oeuvre) => {
            this.oeuvre = oeuvre;
            this.oeuvre.fichierSon = buildUrlMedia(oeuvre.fichierSon);
            this.oeuvre.fichierSonDaide = buildUrlMedia(oeuvre.fichierSonDaide);
            this.oeuvre.vignette = buildUrlMedia(oeuvre.vignette);
            this.oeuvre.plan = buildUrlMedia(oeuvre.plan);
        });
      });
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
}
