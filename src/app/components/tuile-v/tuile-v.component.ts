import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-tuile-v',
  templateUrl: './tuile-v.component.html',
  styleUrls: ['./tuile-v.component.scss']
})
export class TuileVComponent {

  @Input()
  tuile: Tuile | undefined;

  constructor() { }
}

export interface Tuile {
  img:string,
  title?:string,
  titleUrl?:string,
  champs?: Champ[]
}

export interface Champ {
  lbl?:string,
  icon?:string,
  url?:string,
}
