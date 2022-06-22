import { Component, Input, OnInit } from '@angular/core';
import { JAngularService, JcmsPager } from 'j-angular';
import { DesignSystemService } from 'src/app/services/design-system.service';
import { FaqEntry } from 'src/app/models/jcms/faqEntry';

@Component({
  selector: 'app-overlay-tuto',
  templateUrl: './overlay-tuto.component.html',
  styleUrls: ['./overlay-tuto.component.scss']
})
export class OverlayTutoComponent implements OnInit {

  @Input()
  isIcon: boolean | undefined;

  title: string = $localize`:@@OverlayTutoComp-titre:Tutoriel`;
  closeTxt = $localize `:@@OverlayTutoComp-close:Fermer la boîte de dialogue \: ${this.title}:title:`
  icon: string = "icon-info";

  pager: JcmsPager<FaqEntry> | undefined;
  faqEntry: FaqEntry[] | undefined;

  constructor(
    private _ds: DesignSystemService,
    private _jcms: JAngularService) { }

  ngOnInit(): void {
    this._ds.initOverlay();

    this._jcms.getPager<FaqEntry>('search', { //filtrer sur faq tuto
      params: {
        types: 'FaqEntry',
        exactType: true,
      },
    }).subscribe((pager: JcmsPager<FaqEntry>) => {
      if (!this.faqEntry) {
        this.faqEntry = [];
      }

      this.pager = pager;
      const contents = pager.dataInPage;
      this.faqEntry = contents;
    });

  }

  public getClassButton() {
    if (this.isIcon)
      return "ds44-btn--menu ds44-btnIcoText--maxi ds44--xl-padding btn-menu-component";

    return "ds44-btnStd btn-full-width";
  }

  public getClassIcon() {
    if (this.isIcon)
      return "icon icon--large " + this.icon;

    return "icon " + this.icon
  }

  getQuestionsTitle(): string[] | undefined {
    return this.faqEntry?.map(
      (itFaqEntry: FaqEntry) => itFaqEntry.title
    );
  }

  getAnswers(): string[] | undefined {
    return this.faqEntry?.map(
      (itFaqEntry: FaqEntry) => itFaqEntry.answer
    );
  }

  getAriaLbl() {
    return "overlay-" + this.title + "-title";
  }

}
