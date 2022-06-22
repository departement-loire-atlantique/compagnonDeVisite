import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JAngularService } from 'j-angular';
import { OeuvreExplore } from 'src/app/models/jcms/OeuvreExplore';

@Component({
  selector: 'app-oeuvre',
  templateUrl: './oeuvre.component.html',
  styleUrls: ['./oeuvre.component.scss']
})
/**
 * Affichage d'une oeuvre en mode "j'explore"
 */
export class OeuvreComponent implements OnInit, OnDestroy {

  oeuvre!: OeuvreExplore | undefined;
  isAudioEnded: boolean = false;
  urlRetour!: string;

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
          .get<OeuvreExplore>('data/' + id)
          .subscribe((oeuvre: OeuvreExplore) => {
            this.oeuvre = oeuvre;
        });
      });
      this.urlRetour = '/explore/' + sessionStorage.getItem('textExplore');
  }

  // Détection fin audio
  changeAudioEnd(event: any) {
    this.isAudioEnded = event;
  }
}
