import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JAngularService } from 'j-angular';
import { Parcours, ParcoursMap } from 'src/app/models/jcms/parcours';
import { Tuile } from 'src/app/components/tuile-v/tuile-v.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-parcours',
  templateUrl: './parcours.component.html',
  styleUrls: ['./parcours.component.scss']
})
export class ParcoursComponent implements OnInit {

  mapParcours: ParcoursMap = new ParcoursMap();
  leParcours: Parcours | undefined;
  tuile: Tuile | undefined;
  descriptionTitle: string[] | undefined;
  description: string[] | undefined;

  constructor(
    private _route: ActivatedRoute,
    private _jcms: JAngularService) {}

  ngOnInit(): void {
    let parcoursId = this._route.snapshot.paramMap.get('id');

    if (!parcoursId) {
      return;
    }

    if(!this.descriptionTitle) {
      this.descriptionTitle = ["Afficher la description"];
    }


    this._jcms.get<Parcours>('data/' + parcoursId).subscribe((parcours: Parcours) => {
      this.leParcours = this.mapParcours.mapToParcours(parcours);

      this.tuile= {
        title: this.leParcours.title,
        img: environment.jcms + this.leParcours.visuel,
        champ1: this.getDuree(),
        champ2: this.leParcours.public1,
        icone1: "icon-time",
        icone2: "icon-user",
      }

      if(!this.description) {
        this.description = [];
      }
      this.description[0] = this.leParcours.description;

    });
  }

  public getTuile() {
    return this.tuile;
  }

  public getDescription() {
    return this.description;
  }

  public getDescriptionTitle() {
    return this.descriptionTitle;
  }

  public getParcours() {
    return this.leParcours;
  }

  public getTitle() {
    if (!this.leParcours)
      return "";

    return this.leParcours.title;
  }

  public getDuree() {
    if (!this.leParcours)
      return "";

    return this.convertTime(this.leParcours.duree);
  }

  private convertTime(duree: number) { //améliorer pour faire XXh xxmin
    let heure = duree / 3600; //temps en heure
    if(heure < 1)
      return duree/60 + " min"; //temps en min
    return heure + " h";
  }


}
