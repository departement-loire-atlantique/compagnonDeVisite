import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JAngularService, JcmsPager } from 'j-angular';
import { Observable } from 'rxjs';
import { buildUrlMedia, Content } from 'src/app/models/jcms/content';
import { DesignSystemService } from 'src/app/services/design-system.service';
import { Oeuvre } from 'src/app/models/jcms/Oeuvre';
import { environment } from 'src/environments/environment';
import { Item } from 'src/app/models/item';
import { JcmsEspace } from 'src/app/models/environment';
import { EspaceByLangService } from 'src/app/services/espace-by-lang.service';
import { Parcours } from 'src/app/models/jcms/parcours';

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
  resultRetrieveKey: string = 'jsonExplore'
  resultRetrieve!: Search[];
  isResultRetrieve: boolean = false;
  pager: JcmsPager<Content> | undefined;
  plan!: string;
  idCatJExplore!: string;
  idJExplore!: string;
  title!: string;
  video!: string | undefined;
  isFirstArrive: boolean = true;
  listHelp!: Item[];

  itSearchItem: (SearchItem | undefined)[] = [];

  espaceJcms: JcmsEspace | undefined;

  constructor(
    private _jcms: JAngularService,
    private _ds: DesignSystemService,
    private _route: ActivatedRoute,
    private _jcmsEspace: EspaceByLangService,
    private router: Router,
  ) { }

  /**
   * Initialisation du module
   */
  ngOnInit(): void {
    this._ds.initForm();

    this.espaceJcms = this._jcmsEspace.getJcmsSpace();

    if (!this.espaceJcms) {
      return;
    }

    this.isFirstArrive = true;

    this.idJExplore = localStorage.getItem("IdJExplore") || "";
    this.idCatJExplore = environment.catJExplore;
    sessionStorage.removeItem("URLback");

    this._jcms.get<Parcours>('data/' + this.idJExplore).subscribe((parcours: Parcours) => {
      this.title = parcours.titreAffiche ? parcours.titreAffiche : parcours.title;
      this.video = parcours.video || undefined;
    });

    var resultRetrieveSessionStorage = sessionStorage.getItem(this.resultRetrieveKey) ? JSON.parse(sessionStorage.getItem(this.resultRetrieveKey) || '') : '';
    if (resultRetrieveSessionStorage != '') {
      // retrouve la recherche
      this.resultRetrieve = resultRetrieveSessionStorage;
      this.text = this.resultRetrieve[0].searchField;
      this.result = this.resultRetrieve;
      this.isResultRetrieve = true;
      this.isFirstArrive = false;
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

    this.isFirstArrive = false;
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
          text: Number(this.text) ? this.text :  this.text + '*',
          types: ['Oeuvre'],
          searchedFields: Number(this.text) ? ['numeroDeLoeuvre'] : ['title', 'numeroDeLoeuvre', 'description'],
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
   * Stockage des résultats
   * @param obs
   */
  public processResult(obs: Observable<JcmsPager<Content>>) {
    obs.subscribe((pager: JcmsPager<Content>) => {
      if (!this.result) {
        this.result = [];
      }

      let itSearchItemSave = this.itSearchItem;
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
              lbl: res.titreAffiche ? res.titreAffiche : itContent.title,
              img: buildUrlMedia(res.vignette),
              url: '/explore/oeuvre/' + itContent.id,
            },
            state: State.active
          };
          this.result = [{
            searchField: this.text,
            searchItem: [...itSearchItemSave, ...this.itSearchItem],
          }];

          // Si  recherche avec le numéro de l'oeuvre -> route dans l'oeuvre
          if (this.result.length > 0 && Number(this.text)){
            sessionStorage.setItem("URLback", "/explore");
            this.router.navigate([this.result[0].searchItem[0]?.item.url]);
          } else {
            sessionStorage.setItem(this.resultRetrieveKey, JSON.stringify(this.result));
          }

        });
      }

      this.researchRun = false;
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

  /**
 * Get l'id de la video LSF
 * @returns l'id de la video
 */
  public getVideo() {
    return this.video;
  }

  /**
   * Label du bouton de retour
   */
  getLabelBouton() {
    return $localize`:@@BackComp-text-parcours:Retour aux parcours`;
  }

  public buildClassLabelForm(): string {
    return "ds44-formLabel " + (this.text ? 'ds44-moveLabel' : '')
  }
}

/**
 * Gestion mémoire de la recherche
 */
export interface Search {
  searchField: string,
  searchItem: (SearchItem | undefined)[],
}

export interface SearchItem {
  item: Item,
  state?: State,
}

export enum State {
  active = "active",
  inactive = "inactive",
  passed = "passed"
}
