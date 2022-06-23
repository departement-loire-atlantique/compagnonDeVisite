import { Location } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {Router} from "@angular/router"

/**
 * This component should be used to go back to the previous page.
 */
@Component({
  selector: 'app-back',
  templateUrl: './back.component.html',
  styleUrls: ['./back.component.scss'],
})
export class BackComponent {
  /**
   * Text du lien de retour.
   * Default: Retour
   */
  @Input()
  text: string = 'Retour';

  /**
   * Titre du lien.
   * Default: Retour à la page précédente
   */
  @Input()
  titleLink: string = 'Retour à la page précédente';

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

  constructor(private _location: Location,
    private _router: Router) {}

  /**
   * @ignore
   */
  back() {
    if (this.customProcess) {
      this._router.navigate(['/themes'])
      // this._location.go('themes');
      // this.returnCustom.emit('return');
    } else {
      this._location.back();
    }
  }
}
