import { AfterViewInit, Component, Input } from '@angular/core';

import { DesignSystemService } from 'src/app/services/design-system.service';

import { Item } from 'src/app/models/item';

@Component({
  selector: 'app-collapser',
  templateUrl: './collapser.component.html',
  styleUrls: ['./collapser.component.scss'],
})
export class CollapserComponent implements AfterViewInit {
  @Input()
  dataTitle: string[] | undefined;

  @Input()
  dataVal: string[] | undefined;

  @Input()
  dataItems: Item[][] | undefined;

  prefixId: string =
    'collapser-' + Math.random().toString().replace('.', '') + '-';

  constructor(private _ds: DesignSystemService) {}

  ngAfterViewInit(): void {
    this._ds.initCollapser();
  }

  dynamiqueAddInnerHTML(i: number, id: string) {
    const div = document.querySelector('#' + id);
    if (div) {
      div.innerHTML = this.dataVal ? this.dataVal[i] : '';
    }
  }
}
