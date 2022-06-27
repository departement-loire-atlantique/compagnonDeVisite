import { Component, Input } from '@angular/core';
import { Etape, State } from '../etapes/etapes.component';

@Component({
  selector: 'app-tuile-h-etape',
  templateUrl: './tuile-h-etape.component.html',
  styleUrls: ['./tuile-h-etape.component.scss']
})
export class TuileHEtapeComponent  {

  @Input()
  etapes: Etape[] | undefined;

  inactive = State.inactive;
  active = State.active;
  passes = State.passed;

  constructor() { }

}

