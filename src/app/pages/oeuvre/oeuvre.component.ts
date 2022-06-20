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

  ngOnInit(): void {

    let i: number = Number(this._route.snapshot.paramMap.get('index'));
    console.log(i);
    let etapeStore = localStorage.getItem("etape");
    console.log(etapeStore);
    if (etapeStore) {
      let json = JSON.parse(etapeStore);
      this.setEtapeState(json, i);
    }

  }

  private setEtapeState(json: any, i: number) {
    if (json[i + 1] != undefined && json[i + 1].state == State.inactive) {
      json[i].state = State.passed;
      json[i + 1].state = State.active;
    }
    localStorage.setItem("etape", JSON.stringify(json));
  }

}
