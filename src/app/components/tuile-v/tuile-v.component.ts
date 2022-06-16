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
  title:string,
  img:string,
  champ1?:string,
  champ2?:string,
  icone1?:string,
  icone2?:string,
  url1?:string,
  url2?:string
}
