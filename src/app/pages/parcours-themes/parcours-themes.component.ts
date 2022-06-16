import { Component, OnInit } from '@angular/core';
import { JAngularService } from 'j-angular';
import { Observable, map } from 'rxjs';
import { Category } from 'src/app/models/jcms/category';
import { environment } from 'src/environments/environment';
import { Item } from 'src/app/models/item'

@Component({
  selector: 'app-parcours-themes',
  templateUrl: './parcours-themes.component.html',
  styleUrls: ['./parcours-themes.component.scss']
})
export class ParcoursThemesComponent implements OnInit {

  idCatHome: string = environment.catHome;
  listCat: Item[] | undefined;

  constructor(private _jcms: JAngularService) { }

  ngOnInit(): void {
    this._jcms.get<Category>('data/children/' + this.idCatHome)
      .pipe(
        map((rep: any) =>
          rep.dataSet.map((itData: any): Category => this.mapToCat(itData))
        )
      )
      .pipe(
        map((cats: Category[]) =>
          cats.sort((cat1, cat2) => cat1.order - cat2.order)
        )
      ).subscribe((cats: Category[]) => {

        if(!this.listCat) {
          this.listCat = [];
        }

        for(let ind = 0; ind < cats.length; ind++) {
          let c = cats[ind];
          this.listCat.splice(ind, 0 , {
            img: c.image,
            lbl: c.title,
            url: "/parcours/" + c.id,
          })
        }

      });

  }

  public getListCat() {
    return this.listCat;
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
      idContentTrieur: dataRep.extraDataMap,
      parent: dataRep.parent ? dataRep.parent.id : undefined,
    };
  }

}
