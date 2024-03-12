import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { JAngularService } from 'j-angular';
import { Media } from 'src/app/models/jcms/media';
import { buildUrlMedia } from 'src/app/models/jcms/content';

import panzoom from "panzoom";

@Component({
  selector: 'app-plan-pdf',
  templateUrl: './plan-pdf.component.html',
  styleUrls: ['./plan-pdf.component.scss']
})
export class PlanPDFComponent implements OnInit, AfterViewInit {
  @ViewChild('imagePlan', { static: false }) imagePlan!: ElementRef;

  planPDF: String = '';
  title: string = $localize`:@@OverlayMapComp-titre:Carte`;
  closeTxt = $localize `:@@OverlayMapComp-close:Fermer la boîte de dialogue \: ${this.title}:title:`
  idTarget: string = "overlay-map";

  constructor( private _jcms: JAngularService) { }

  ngOnInit(): void {
    this._jcms.get<any>('admin/property/jcmsplugin.compagnonDeVisite.planPDF').subscribe((result: any) => {
        this._jcms.get<Media>('data/' + result.value).subscribe((media: Media) => {
          if (media) {
            this.planPDF = buildUrlMedia(media.filename);
          }
        });
    });
  }

  ngAfterViewInit() {
    panzoom(this.imagePlan.nativeElement, {
      maxZoom: 5,
      minZoom: 0.5
    });
  }
    /**
   * get label bouton
   */
    public getLabelBtn() {
      return $localize`:@@BackComp-text:Retour` ;
    }

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
