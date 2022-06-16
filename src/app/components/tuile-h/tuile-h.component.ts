import { Component, Input } from '@angular/core';
import { Item } from 'src/app/models/item'

@Component({
  selector: 'app-tuile-h',
  templateUrl: './tuile-h.component.html',
  styleUrls: ['./tuile-h.component.scss']
})
export class TuileHComponent  {

  @Input()
  items: Item[] | undefined;

  constructor() { }

}

