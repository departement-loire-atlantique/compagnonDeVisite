import { Component, OnInit } from '@angular/core';
import { JAngularService, JcmsPager } from 'j-angular';
import { JcmsEspace } from 'src/app/models/environment';
import { DesignSystemService } from 'src/app/services/design-system.service';
import { EspaceByLangService } from 'src/app/services/espace-by-lang.service';
import { Search, SearchItem, State } from '../explore/explore.component';
import { environment } from 'src/environments/environment';
import { buildUrlMedia, Content } from 'src/app/models/jcms/content';
import { Observable } from 'rxjs';
import { Oeuvre } from 'src/app/models/jcms/Oeuvre';
import { Location } from '@angular/common';

@Component({
  selector: 'app-explore-all',
  templateUrl: './explore-all.component.html',
  styleUrls: ['./explore-all.component.scss']
})
export class ExploreAllComponent implements OnInit {

  plan!: string;
  researchRun: boolean = false;
  result!: Search[];
  espaceJcms: JcmsEspace | undefined;
  idCatJExplore!: string;
  pager: JcmsPager<Content> | undefined;
  text: string = '';
  itSearchItem: (SearchItem | undefined)[] = [];
  resultRetrieve!: Search[];
  isResultRetrieve: boolean = false;
  resultRetrieveKey: string = 'jsonExploreAll'

  constructor(
    private _ds: DesignSystemService,
    private _jcmsEspace: EspaceByLangService,
    private _jcms: JAngularService,
    private _location: Location,
  ) { }

  /**
   *
   * @returns Init du component
   */
  ngOnInit(): void {
    this._ds.initForm();

    this.espaceJcms = this._jcmsEspace.getJcmsSpace();

    if (!this.espaceJcms) {
      return;
    }

    this.idCatJExplore = environment.catJExplore;

    // Gestion du cache
    var resultRetrieveSessionStorage = sessionStorage.getItem(this.resultRetrieveKey) ? JSON.parse(sessionStorage.getItem(this.resultRetrieveKey) || '') : '';
    if (resultRetrieveSessionStorage != '') {
      // retrouve la recherche
      this.resultRetrieve = resultRetrieveSessionStorage;
      this.text = this.resultRetrieve[0].searchField;
      this.result = this.resultRetrieve;
      this.isResultRetrieve = true;
//      sessionStorage.removeItem(this.resultRetrieveKey);
    }
    this.research();
  }

    /**
   * Get le plan du parcours
   * @returns la plan
   */
  public getPlan() {
    if (!this.plan)
      return "";

    return this.plan;
  }

  /**
   * Stockage des résultats
   * @param obs
   */
  public processResult(obs: Observable<JcmsPager<Content>>) {
    obs.subscribe((pager: JcmsPager<Content>) => {
    if (!this.result)
      this.result = [];

    this.itSearchItem = [];

    this.pager = pager;
    const contents = pager.dataInPage;

    for (let i = 0; i < contents.length; i++) {
      const itContent = contents[i];

      // array init with empty item (for order)
      this.itSearchItem.push(undefined);

      this._jcms.get<Oeuvre>('data/' + itContent.id).subscribe(res => {
        this.itSearchItem[i] = {
              item: {
                lbl: itContent.title,
                img: buildUrlMedia(res.vignette),
                url: '/explore/oeuvre/' + itContent.id,
              },
              state: State.active
            };
            this.result = [{
              searchField: this.text,
              searchItem: this.itSearchItem,
            }];
            sessionStorage.setItem(this.resultRetrieveKey, JSON.stringify(this.result));
          });
        }
        // Sauvegarde des résultats de la recherche
        this.researchRun = false;
      });
    }

  /**
   * Lance la recherche du HTML
   * @returns
   */
   public research(): void {

    if (this.isResultRetrieve) {
      this.isResultRetrieve = false;
      return;
    }

    this.result = [];
    // Catégorie inexistante -> pas de résultats
    if (!this.idCatJExplore) {
      return;
    }

    this.researchRun = true;
    this.itSearchItem = [];

    this.processResult(
      this._jcms.getPager<Content>('search', {
        params: {
          types: ['Oeuvre'],
          sort: ['title'],
          exactType: true,
          mode: 'advanced',
          wrkspc: this.espaceJcms ? this.espaceJcms.espace : "",
          cids: this.idCatJExplore,
        },
      })
    );
  }

  /**
   *
   * @returns Nombre de résultat(s)
   */
  public lblNbResult(): string {
    if (this.result) {
      if (this.result.length <= 0) {
        sessionStorage.removeItem(this.resultRetrieveKey);
        return $localize`:@@ExploreComp-noResult:Oups, il n’y a pas de résultat. Merci de préciser ou reformuler ta recherche`;
      }
    }
    return '';
  }

  /**
   * pager sans fin
   */
   public moreResult() {
    if (this.pager) {
      this.processResult(this.pager.next());
    }
  }

  /**
   * Url de retour
   */
   public returnUrl() {
    return '/themes'
  }

  /**
   * Label du bouton de retour
   */
  getLabelBouton() {
    return $localize`:@@BackComp-text:Retour à la recherche`;
  }
}
