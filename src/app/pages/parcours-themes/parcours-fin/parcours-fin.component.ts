import { Component, OnInit } from '@angular/core';
import { Tuile } from 'src/app/components/tuile-v/tuile-v.component';
import { JAngularService } from 'j-angular';
import { Parcours, ParcoursMap } from 'src/app/models/jcms/parcours';
import { ActivatedRoute } from '@angular/router';
import { CatsMngService } from 'src/app/services/cats-mng.service';
import { environment } from 'src/environments/environment';
import { Category } from 'src/app/models/jcms/category';

@Component({
  selector: 'app-parcours-fin',
  templateUrl: './parcours-fin.component.html',
  styleUrls: ['./parcours-fin.component.scss']
})
export class ParcoursFinComponent implements OnInit {

  mapParcours: ParcoursMap = new ParcoursMap();
  tuile:Tuile | undefined;
  map: string | undefined;
  video: string | undefined;
  transcription?: string;
  idParcours: string = "idParcours";
  idThematique: string = "idThematique";
  idCatRoot: string = '';
  imageFooter: string = 'assets/phone_only@2x.png';

  constructor(
    private _route: ActivatedRoute,
    private _jcms: JAngularService,
    private _catMng: CatsMngService,) { }

  ngOnInit(): void {

    this.idCatRoot = environment.catRoot;

    this._catMng.cat(this.idCatRoot).subscribe((cat: Category) => {
      if (cat.image) {
        this.imageFooter = cat.image;
      }
    });

    let parcoursId = this._route.snapshot.paramMap.get('id');

    if (!parcoursId) {
      return;
    }
    this._jcms.get<Parcours>('data/' + parcoursId).subscribe((parcours: Parcours) => {
      let p = this.mapParcours.mapToParcours(parcours);
      this.map = p.plan;
      this.video = p.videoFin;
      this.transcription = p.transcriptionFin;
      this.tuile = {
        img: p.visuel,
//        champs: [{lbl: $localize`:@@ParcoursFinComp-fav-text:Ajouter la liste des oeuvres à mes favoris`, icon:"icon-star-empty"}]
      }
    });
  }

  public getHomeParcours() {
    return 'parcours/' + localStorage.getItem(this.idParcours);
  }

  public getHome() {
    return '/themes';
  }

  public getTuile() {
    return this.tuile;
  }

  public getMap() {
    return this.map;
  }

    /**
   * get label bouton
   */
     public getLabelBtn() {
      return $localize`:@@BackComp-oeuvre:Retour à l'œuvre`;
    }
}
