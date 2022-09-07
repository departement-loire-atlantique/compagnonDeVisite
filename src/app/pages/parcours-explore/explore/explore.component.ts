import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JAngularService, JcmsPager } from 'j-angular';
import { Observable } from 'rxjs';
import { Content } from 'src/app/models/jcms/content';
import { DesignSystemService } from 'src/app/services/design-system.service';
import { OeuvreExplore } from 'src/app/models/jcms/OeuvreExplore';
import { environment } from 'src/environments/environment';
import { Item } from 'src/app/models/item';
import { JcmsEspace } from 'src/app/models/environment';
import { EspaceByLangService } from 'src/app/services/espace-by-lang.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})

/**
 * Affichage de la recherche "j'explore"
 */
export class ExploreComponent implements OnInit {

  text!: string;
  researchRun: boolean = false;
  result!: Search[];
  resultRetrieveKey: string = 'jsonExplore;'
  resultRetrieve!: Search[];
  isResultRetrieve: boolean = false;
  pager: JcmsPager<Content> | undefined;
  plan!: string;
  idCatJExplore!: string;
  title!: string;

  espaceJcms: JcmsEspace | undefined;

  constructor(
    private _jcms: JAngularService,
    private _ds: DesignSystemService,
    private _route: ActivatedRoute,
    private _jcmsEspace: EspaceByLangService,
  ) { }

  /**
   *
   */
  ngOnInit(): void {
    this._ds.initForm();

    this.title = localStorage.getItem("TitleJExplore") || "Visite libre dans le musée";

    this.espaceJcms = this._jcmsEspace.getJcmsSpace();

    if (!this.espaceJcms) {
      return;
    }

    this.idCatJExplore = environment.catJExplore;

    var resultRetrieveSessionStorage = sessionStorage.getItem(this.resultRetrieveKey) ? JSON.parse(sessionStorage.getItem(this.resultRetrieveKey) || '') : '';
    if (resultRetrieveSessionStorage !== '') {
      // retrouve la recherche
      // TODO Gestion du pager
      this.resultRetrieve = resultRetrieveSessionStorage;
      this.text = this.resultRetrieve[0].searchField;
      this.result = this.resultRetrieve;
      this.isResultRetrieve = true;
      sessionStorage.removeItem(this.resultRetrieveKey);
    } else {
      // Recherche par url
      this._route.paramMap.subscribe((params) => {
        if (params.get('text')) {
          this.text = params.get('text') || '';
        }
      })
    }
  }

  /**
   * Lance la recherche du HTML
   * @returns
   */
  public research(): void {
    if (!this.text || this.isResultRetrieve) {
      this.isResultRetrieve = false;
      return;
    }

    this.result = [];
    // Catégorie inexistante -> pas de résultats
    if (!this.idCatJExplore) {
      return;
    }

    this.researchRun = true;

    this.processResult(
      this._jcms.getPager<Content>('search', {
        params: {
          text: this.text + '*',
          types: ['OeuvreExplore'],
          searchedFields: ['title'],
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
   * @param obs
   */
  public processResult(obs: Observable<JcmsPager<Content>>) {
    obs.subscribe((pager: JcmsPager<Content>) => {
      if (!this.result) {
        this.result = [];
      }

      this.pager = pager;
      const contents = pager.dataInPage;

      for (let itContent of contents) {
        this._jcms.get<OeuvreExplore>('data/' + itContent.id).subscribe(res => {
          this.result?.push({
            searchField: this.text,
            item: [{
              lbl: itContent.title,
              img: environment.jcms + res.vignette,
              url: '/explore/oeuvre/' + itContent.id,
            }],
          });
          // Sauvegarde des résultats de la recherche
          sessionStorage.setItem(this.resultRetrieveKey, JSON.stringify(this.result));
        });
      }
      this.researchRun = false;

      // TODO Focus for accessibility
    });
  }

  /**
   *
   * @returns Nombre de résultat(s)
   */
  public lblNbResult(): string {
    if (this.result && this.text) {
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
   * Get le plan du parcours
   * @returns la plan
   */
  public getPlan() {
    if (!this.plan)
      return "";

    return this.plan;
  }

  /**
   * Url de retour
   */
  public returnUrl() {
    return '/themes'
  }
}

/**
 * Gestion mémoire de la recherche
 */
export interface Search {
  searchField: string,
  item: Item[],
}
