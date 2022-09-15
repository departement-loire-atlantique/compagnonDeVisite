import { Location } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {Router} from "@angular/router"

/**
 * This component should be used to go back to the previous page.
 */
@Component({
  selector: 'app-back-popup',
  templateUrl: './back-popup.component.html',
  styleUrls: ['./back-popup.component.scss'],
})
export class BackPopupComponent {
  /**
   * Text du lien de retour.
   * Default: Retour
   */
  @Input()
  text: string = $localize`:@@BackComp-text:Retour`;

  /**
   * Titre du lien.
   * Default: Retour à la page précédente
   */
  @Input()
  titleLink: string = $localize`:@@BackComp-link-title:Retour à la page précédente`;

  /**
   * icon du lien.
   * Default: icon-arrow-left
   */
  @Input()
  picto: string = 'icon-long-arrow-left';

  /**
   * true if return processed by parent.
   * setup "returnCustom" output.
   */
  @Input()
  customProcess: boolean = false;

  @Output()
  returnCustom: EventEmitter<string> = new EventEmitter<string>();

  @Input()
  idTarget: string = "overlay-back";

  @Input()
  title: string = $localize`:@@BackPopUpComp-title-pop-up:Quitter le parcours ?`;

  constructor(private _location: Location) {}

  /**
   * @ignore
   */
  back() {
    if (this.customProcess) {
      this.returnCustom.emit('return');
    } else {
      this._location.back();
    }
  }
}
