import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { JAngularService,JcmsPager } from 'j-angular';
import { Content } from 'src/app/models/jcms/content';
import { Observable } from 'rxjs';
import { JcmsEspace } from 'src/app/models/environment';
import { EspaceByLangService } from 'src/app/services/espace-by-lang.service';
import { MenuBurger, MenuBurgerMap } from 'src/app/models/jcms/menuburger';
import panzoom from "panzoom";

@Component({
  selector: 'app-plan-pdf',
  templateUrl: './plan-pdf.component.html',
  styleUrls: ['./plan-pdf.component.scss']
})
export class PlanPDFComponent implements OnInit, AfterViewInit {
  @ViewChild('imagePlan', { static: false }) imagePlan!: ElementRef;
  pager: JcmsPager<Content> | undefined;
  espaceJcms: JcmsEspace | undefined;
  idCatMenu: string = '';

  menuBurgerMap: MenuBurgerMap = new MenuBurgerMap();
  menuBurger!: MenuBurger;

  constructor( private _jcms: JAngularService, private _jcmsEspace: EspaceByLangService, ) {
    this.espaceJcms = this._jcmsEspace.getJcmsSpace();
    if (this.espaceJcms) {
      this.idCatMenu = this.espaceJcms.catMenu;
    }
  }

  ngOnInit(): void {
   this.research();
  }

  ngAfterViewInit() {
    panzoom(this.imagePlan.nativeElement, {
      maxZoom: 5,
      minZoom: 0.5
    });
  }

  /**
   * Stockage du résultat
   * @param obs
   */
  public processResult(obs: Observable<JcmsPager<Content>>) {
    obs.subscribe((pager: JcmsPager<Content>) => {

      this.pager = pager;
      const contents = pager.dataInPage;
      if (contents.length < 1) return;

      const itContent = contents[0];
      this._jcms.get<any>('data/' + itContent.id).subscribe(res => {
        this.menuBurger = this.menuBurgerMap.mapToMenuBurger(res);
      });
    });
  }

  /**
   * Lance la recherche du planPDF
   * @returns
   */
  public research(): void {
    this.processResult(
      this._jcms.getPager<Content>('search', {
        params: {
          types: ['MenuBurger'],
          text: 'plan*',
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

  /**
   * Gestion du zoom
   * @param palier
   */
  public zoom(palier: number = 100) {
    var currWidth = this.imagePlan.nativeElement.clientWidth;
    if (currWidth < 300) {
      currWidth = 300;
    } else if (currWidth > 700) {
      currWidth = 700;
    }
    this.imagePlan.nativeElement.style.width = (currWidth - palier) + "px"
    this.imagePlan.nativeElement.style.objectFit = "cover";
  }
}
