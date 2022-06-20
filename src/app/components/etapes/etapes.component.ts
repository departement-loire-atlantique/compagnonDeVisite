import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-etapes',
  templateUrl: './etapes.component.html',
  styleUrls: ['./etapes.component.scss']
})
export class EtapesComponent {

  @Input()
  etapes: Etape[] | undefined;

  constructor() { }

}

export interface Etape {
  url: string,
  state: State,
}

export enum State {
  active = "active",
  inactive = "inactive",
  passed = "passed"
}
