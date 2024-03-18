import { Injectable } from '@angular/core';
import { JAngularService } from 'j-angular';
import { Observable, map } from 'rxjs';
import { EspaceByLangService } from 'src/app/services/espace-by-lang.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PropsMngService {
  constructor(private _jcms: JAngularService,
    private _jcmsEspace: EspaceByLangService) { }

  public propsLbl(prop: string): Observable<String> {
    return this._jcms
      .get<String>('plugins/compagnon/prop/' + prop)
      .pipe(
        map((rep: any): String => rep.value)
      );
  }

  public propsLangLbl(prop: string): Observable<String> {
    if(this._jcmsEspace.getLocal() == "en") {
      prop += ".en"
    } else {
      prop += ".fr"
    }

    return this._jcms
      .get<String>('plugins/compagnon/prop/' + prop)
      .pipe(
        map((rep: any): String => rep.value)
      );
  }

  public propsImg(prop: string): Observable<String> {
    return this._jcms
      .get<String>('plugins/compagnon/prop/' + prop)
      .pipe(
        map((rep: any): String => environment.jcms + rep.value)
      );
  }
}
