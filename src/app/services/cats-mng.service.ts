import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Category } from '../models/jcms/category';
import { JAngularService } from 'j-angular';

@Injectable({
  providedIn: 'root',
})
export class CatsMngService {
  constructor(private _jcms: JAngularService) { }

  /**
   *
   * @param idCat
   * @returns Retourne les categories enfant
   */
  public catsChildren(idCat: string): Observable<Category[]> {
    return this._jcms
      .get<Category[]>('plugins/compagnondevisite/category/children/' + idCat, {
        params: { pagerAll: 'true' },
      })
      .pipe(
        // ex rep voir \assets\mock\cats\children\**
        map((rep: any) =>
          rep.dataSet.map((itData: any): Category => this.mapToCat(itData))
        )
      )
      .pipe(
        map((cats: Category[]) =>
          cats.sort((cat1, cat2) => cat1.order - cat2.order)
        )
      );
  }

  /**
   *
   * @param idCat
   * @returns
   */
  public cat(idCat: string): Observable<Category> {
    return this._jcms
      .get<Category>('data/' + idCat, {
        params: {
          related: 'extraDataMap',
        },
      })
      .pipe(
        // ex rep voir \assets\mock\cats\**
        map((rep: any): Category => this.mapToCat(rep))
      );
  }

  private mapToCat(dataRep: any): Category {
    return {
      id: dataRep.id,
      title: dataRep.name,
      smallTitle: dataRep.synonyms ? dataRep.synonyms[0] : dataRep.name,
      subTitle: dataRep.description,
      icon:
        dataRep.icon && dataRep.icon.startsWith('upload')
          ? environment.jcms + dataRep.icon
          : dataRep.icon,
      image:
        dataRep.image && dataRep.image.startsWith('upload')
          ? environment.jcms + dataRep.image
          : dataRep.image,
      url: dataRep.friendlyURLSet ? dataRep.friendlyURLSet[0] : '',
      order: dataRep.order,
      parent: dataRep.parent ? dataRep.parent.id : undefined,
      afficheExpo: dataRep.afficheExpo,
      videoLsf: dataRep.extraDataMap ? dataRep.extraDataMap['extra.Category.compagnonDeVisite.lsf.video'] : '',
      videoLsfTranscription: dataRep.extraDataMap ? dataRep.extraDataMap['extra.Category.compagnonDeVisite.lsf.video.text'] : '',
    };
  }
}
