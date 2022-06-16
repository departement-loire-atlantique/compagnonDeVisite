import { Component, Input } from '@angular/core';
import { Item } from 'src/app/models/item'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
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
    return ListComponent.regInternLink.test(url);
  }
}
