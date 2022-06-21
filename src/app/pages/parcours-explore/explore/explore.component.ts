import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JAngularService, JcmsPager } from 'j-angular';
import { Observable } from 'rxjs';
import { Content } from 'src/app/models/content';
import { DesignSystemService } from 'src/app/services/design-system.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit, AfterViewInit {

  text!: string;

  researchRun: boolean = false;

  result: any[] | undefined;

  pager: JcmsPager<Content> | undefined;

  constructor(
    private _jcms: JAngularService,
    private _ds: DesignSystemService,
    private _route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this._route.paramMap.subscribe((params) => {
      if (params.get('text')) {
        this.text = params.get('text') || '';
        this.research();
      }
    });
  }

  ngAfterViewInit(): void {
    this._ds.initForm();
  }

  public research(): void {
    this.result = undefined;
    this.pager = undefined;
    if (!this.text) {
      return;
    }

    this.researchRun = true;

    this.processResult(
      this._jcms.getPager<Content>('search', {
        params: {
          text: this.text,
          types: ['Oeuvre'],
          exactType: true,
        },
      })
    );
  }

  public processResult(obs: Observable<JcmsPager<Content>>) {
    obs.subscribe((pager: JcmsPager<Content>) => {
      if (!this.result) {
        this.result = [];
      }

      this.pager = pager;
      const contents = pager.dataInPage;

      for (let itContent of contents) {
        this.result.push({
          lbl: itContent.title,
          url: '/explore/oeuvre/'+itContent.id,
        });
        sessionStorage.setItem('textExplore', this.text ? this.text : '');
      }
      this.researchRun = false;

      // TODO Focus for accessibility
    });
  }

  public lblNbResult(): string {
    if (this.result) {
      if (this.result.length <= 0) {
        return 'Oups, il n’y a pas de résultat. Merci de préciser ou reformuler ta recherche';
      }
      if (this.result.length == 1) {
        return 'Il y a 1 résultat';
      }
      return (
        'Il y a ' +
        (this.pager ? this.pager.total : this.result.length) +
        ' résultats'
      );
    }
    return '';
  }

  public moreResult() {
    if (this.pager) {
      this.processResult(this.pager.next());
    }
  }
}
