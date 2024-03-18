import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { JcmsEspace } from '../models/environment';

@Injectable({
  providedIn: 'root'
})
export class EspaceByLangService {

  constructor(
    @Inject(LOCALE_ID) private _locale: string,
    private _router: Router
  ) { }

  getJcmsSpace(): JcmsEspace | undefined {
    const jcmsEspace: JcmsEspace = environment.lang[this._locale];

    if (!jcmsEspace) {
      this._router.navigateByUrl('error/F-01', { skipLocationChange: true });
      return undefined;
    }

    return jcmsEspace;
  }

  getLocal(): string {
    return this._locale;
  }
}
