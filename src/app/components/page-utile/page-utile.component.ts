import { Component } from '@angular/core';
import { DesignSystemService } from 'src/app/services/design-system.service';

@Component({
  selector: 'app-page-utile',
  templateUrl: './page-utile.component.html',
  styleUrls: ['./page-utile.component.scss']
})
export class PageUtileComponent {

  defaultCssY: string = "hidden";
  defaultCssN: string = "hidden";
  defaultCssBtnY: string = "btn-not-active";
  defaultCssBtnN: string = "btn-not-active";

  constructor(
    private _ds: DesignSystemService) {
      this._ds.initForm();
    }

    public getCSSY() {
      return this.defaultCssY;
    }

    public getCSSN() {
      return this.defaultCssN;
    }

    public getCSSBtnY() {
      return this.defaultCssBtnY;
    }

    public getCSSBtnN() {
      return this.defaultCssBtnN;
    }

    public changeCSSY() {
      if(this.defaultCssY == "hidden") {
        this.defaultCssY = "show";
        this.defaultCssN ="hidden";
        this.defaultCssBtnY = "btn-active";
        this.defaultCssBtnN = "btn-not-active";
      }
    }

    public changeCSSN() {
      if(this.defaultCssN == "hidden") {
        this.defaultCssN = "show";
        this.defaultCssY ="hidden";
        this.defaultCssBtnY = "btn-not-active";
        this.defaultCssBtnN = "btn-active";
      }
    }

}
