import { Component, Input } from '@angular/core';
import { Item } from 'src/app/models/item'

@Component({
  selector: 'app-tuile',
  templateUrl: './tuile.component.html',
  styleUrls: ['./tuile.component.scss']
})
export class TuileComponent  {

  @Input()
  items: Item[] | undefined;

  constructor() { }

}

