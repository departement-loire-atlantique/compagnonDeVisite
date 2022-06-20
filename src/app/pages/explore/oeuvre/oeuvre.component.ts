import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JAngularService } from 'j-angular';
import { Oeuvre } from 'src/app/models/oeuvre';

@Component({
  selector: 'app-oeuvre',
  templateUrl: './oeuvre.component.html',
  styleUrls: ['./oeuvre.component.scss']
})
export class OeuvreComponent {

  oeuvre!: Oeuvre | undefined;
  isAudioEnded: boolean = false;

  constructor(
              private _route: ActivatedRoute,
              private _jcms: JAngularService, ) {
    this._route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this._jcms
          .get<Oeuvre>('data/' + id)
          .subscribe((oeuvre: Oeuvre) => {
            this.oeuvre = oeuvre;
            console.log(oeuvre?.fichierSonDaide);
        });
      });
     }

  changeAudioEnd(event: any) {
    this.isAudioEnded = event;
  }

}
