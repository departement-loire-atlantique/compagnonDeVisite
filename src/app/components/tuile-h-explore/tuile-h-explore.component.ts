import { Component, Input } from '@angular/core';
import { SearchItem, State } from 'src/app/pages/parcours-explore/explore/explore.component';

@Component({
  selector: 'app-tuile-h-explore',
  templateUrl: './tuile-h-explore.component.html',
  styleUrls: ['./tuile-h-explore.component.scss']
})
export class TuileHExploreComponent {

  @Input()
  searchItems: (SearchItem | undefined)[] | undefined;

  inactive = State.inactive;
  active = State.active;
  passed = State.passed;

  constructor() { }

}
