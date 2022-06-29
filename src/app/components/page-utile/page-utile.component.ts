import { Component } from '@angular/core';
import { DesignSystemService } from 'src/app/services/design-system.service';

@Component({
  selector: 'app-page-utile',
  templateUrl: './page-utile.component.html',
  styleUrls: ['./page-utile.component.scss']
})
export class PageUtileComponent {

  constructor(
    private _ds: DesignSystemService) {
      this._ds.initForm();
    }

}
