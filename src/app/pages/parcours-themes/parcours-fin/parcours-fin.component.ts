import { Component, OnInit } from '@angular/core';
import { Tuile } from 'src/app/components/tuile-v/tuile-v.component';
import { JAngularService } from 'j-angular';
import { Parcours, ParcoursMap } from 'src/app/models/jcms/parcours';
import { ActivatedRoute } from '@angular/router';
import { buildUrlMedia } from 'src/app/models/jcms/content'

@Component({
  selector: 'app-parcours-fin',
  templateUrl: './parcours-fin.component.html',
  styleUrls: ['./parcours-fin.component.scss']
})
export class ParcoursFinComponent implements OnInit {

  mapParcours: ParcoursMap = new ParcoursMap();
  tuile:Tuile | undefined;
  map: string | undefined = "";
  video: string | undefined;

  constructor(
    private _route: ActivatedRoute,
    private _jcms: JAngularService) { }

  ngOnInit(): void {
    let parcoursId = this._route.snapshot.paramMap.get('id');

    if (!parcoursId) {
      return;
    }
    this._jcms.get<Parcours>('data/' + parcoursId).subscribe((parcours: Parcours) => {
      let p = this.mapParcours.mapToParcours(parcours);
      this.map = p.plan;
      this.video = p.video;
      this.tuile = {
        img: p.visuel,
        champs: [{lbl:"Ajouter la liste des oeuvres à mes favoris", icon:"icon-star-empty"}]
      }
    });
  }

  public getHome() {
    return 'themes';
  }

  public getTuile() {
    return this.tuile;
  }

  public getMap() {
    return this.map;
  }

}
