import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-oeuvre-suiv-pred',
  templateUrl: './oeuvre-suiv-pred.component.html',
  styleUrls: ['./oeuvre-suiv-pred.component.scss']
})
export class OeuvreSuivPredComponent  {

  @Input()
  steps: Steps | undefined;

  constructor() { }

}

export interface Steps {
  debParcours: boolean,
  finParcours: boolean,
  nextStepUrl: string,
  previousStepUrl: string,
  indexNextStep: number,
  indexPreviousStep: number
}
