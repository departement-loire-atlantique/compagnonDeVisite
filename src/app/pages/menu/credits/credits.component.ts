import { Component, OnInit } from '@angular/core';
import { JAngularService,JcmsPager } from 'j-angular';
import { JcmsEspace } from 'src/app/models/environment';
import { EspaceByLangService } from 'src/app/services/espace-by-lang.service';
import { Observable } from 'rxjs';
import { Content } from 'src/app/models/jcms/content';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-credits',
  templateUrl: './credits.component.html',
  styleUrls: ['./credits.component.scss']
})
export class CreditsComponent implements OnInit {
  espaceJcms: JcmsEspace | undefined;
  idCatMenu: string = '';
  pager: JcmsPager<Content> | undefined;
  title: string = '';
  contenuParagraphe: string = '';

  constructor(
    private _jcms: JAngularService,
    private _jcmsEspace: EspaceByLangService,
    private domSanitizer: DomSanitizer, ) {
      this.espaceJcms = this._jcmsEspace.getJcmsSpace();
      if (this.espaceJcms) {
        this.idCatMenu = this.espaceJcms.catMenu;
      }
    this.research();
  }

  ngOnInit(): void {
    this.research();
  }

  /**
   * Stockage des résultats
   * @param obs
   */
  public processResult(obs: Observable<JcmsPager<Content>>) {
    obs.subscribe((pager: JcmsPager<Content>) => {

      this.pager = pager;
      const contents = pager.dataInPage;
      if (contents.length < 1) return;

      const itContent = contents[0];

      this._jcms.get<any>('plugins/compagnondevisite/content/' + itContent.id).subscribe(res => {
        this.title = res.title;
        this.contenuParagraphe = res.content;
      });
    });
  }
  /**
   * Lance la recherche du HTML
   * @returns
   */
  public research(): void {
    this.processResult(
      this._jcms.getPager<Content>('search', {
        params: {
          types: ['FicheArticle'],
          text: 'credit*',
          exactType: true,
          wrkspc: this.espaceJcms ? this.espaceJcms.espace : "",
          cids: this.idCatMenu,
        },
     })
    );
  }

  /**
   * get label bouton
   */
  public getLabelBtn() {
    return $localize`:@@BackComp-text:Retour` ;
  }

  public getContenu() {
    return this.domSanitizer.bypassSecurityTrustHtml(this.contenuParagraphe);
  }
}
