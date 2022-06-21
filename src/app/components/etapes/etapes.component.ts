import { Component, Input } from '@angular/core';
import { Item } from 'src/app/models/item';

@Component({
  selector: 'app-etapes',
  templateUrl: './etapes.component.html',
  styleUrls: ['./etapes.component.scss']
})
export class EtapesComponent {

  @Input()
  etapes: Etape[] | undefined;

  inactive:State = State.inactive;

  constructor() { }

}

export interface Etape {
  item: Item,
  state: State,
}

export enum State {
  active = "active",
  inactive = "inactive",
  passed = "passed"
}
