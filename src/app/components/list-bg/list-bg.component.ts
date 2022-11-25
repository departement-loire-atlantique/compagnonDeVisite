import { Component, Input } from '@angular/core';
import { Item } from 'src/app/models/item'

@Component({
  selector: 'app-list-bg',
  templateUrl: './list-bg.component.html',
  styleUrls: ['./list-bg.component.scss'],
})
export class ListBGComponent {
  static regInternLink: RegExp = /^(\/|\.\/)/;

  @Input()
  items: Item[] | undefined;

  @Input()
  cssClass: string | undefined;

  @Input()
  isBold: boolean = false;

  @Input()
  noSeparator: boolean = false;

  constructor() {}

  public isInternLink(url: string): boolean {
    return ListBGComponent.regInternLink.test(url);
  }

  public getIsPMR(){
    return sessionStorage.getItem("isPMR") === 'true' ? true : false;
  }
}
