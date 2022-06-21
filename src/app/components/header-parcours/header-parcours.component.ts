import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header-parcours',
  templateUrl: './header-parcours.component.html',
  styleUrls: ['./header-parcours.component.scss']
})
export class HeaderParcoursComponent {

  @Input()
  imagePlan:string | undefined;

  constructor() { }


}
