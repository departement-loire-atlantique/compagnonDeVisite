import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { State } from 'src/app/components/etapes/etapes.component';

@Component({
  selector: 'app-oeuvre',
  templateUrl: './oeuvre.component.html',
  styleUrls: ['./oeuvre.component.scss']
})
export class OeuvreComponent implements OnInit {

  constructor(
    private _route: ActivatedRoute) { }

  /**
   * recupère les étapes dans le localStorage
   */
  ngOnInit(): void {
    let i: number = Number(this._route.snapshot.paramMap.get('index'));
    let etapeStore = localStorage.getItem("etape");
    if (etapeStore) {
      let json = JSON.parse(etapeStore);
      this.setEtapeState(json, i);
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
    localStorage.setItem("etape", JSON.stringify(json));
  }

}
