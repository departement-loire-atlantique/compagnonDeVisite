import { Component, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { JAngularService } from 'j-angular';
import { combineLatest, Observable } from 'rxjs';
import { Carousel, CarouselElement } from 'src/app/models/jcms/carousel';
import { buildUrlMedia } from 'src/app/models/jcms/content';
import { DesignSystemService } from 'src/app/services/design-system.service';

@Component({
  selector: 'app-carrousel',
  templateUrl: './carrousel.component.html',
  styleUrls: ['./carrousel.component.scss']
})

/**
 * Gestion des carrousels
 */
export class CarrouselComponent implements OnInit {
  @Input() carousel: Carousel | undefined;

  @Input() id: string | undefined;

  @Input() text: string | undefined;

  @Input() etape: string | undefined;

  elements: (CarouselElement | undefined)[] = [];

  @ViewChildren('itemSwiper')
  itemSwiper: QueryList<any> | undefined;

  private _obsPager: MutationObserver | undefined;

  currentSlide: number = 1;

  isElementLoading: boolean = true;

  constructor(private _ds: DesignSystemService,
    private _jcms: JAngularService) { }

  ngOnInit(): void {
    if (!this.carousel && this.id) {
      this._jcms.get<Carousel>('data/' + this.id).subscribe((res: Carousel) => {
        this.carousel = res;
        this.getFullElement();
      });
    } else {
      this.getFullElement();
    }
  }

  /**
   * Chargement des éléments du carrousel
  */
  getFullElement() {
    if (!this.carousel || !this.carousel.elements1) {
      return;
    }

    const fullElements: Observable<CarouselElement>[] = [];

    for (let i = 0; i < this.carousel.elements1.length; i++) {
      let item = this.carousel.elements1[i];

      // array init with empty item (for order)
      this.elements.push(undefined);

      fullElements[i] = this._jcms.get<CarouselElement>('data/' + item.id);
    }

    combineLatest(fullElements).subscribe(reps => {
      for (let i = 0; i < reps.length; i++) {
        let itRep: CarouselElement = reps[i];
        itRep.imageMobile = buildUrlMedia(itRep.imageMobile);
        this.elements[i] = itRep;
      }

      this.itemSwiper?.changes.subscribe((_) => {
        this.buildCarousel();
      });

      this.isElementLoading = false;
    });
  }

  /**
   * Construction du carrousel via le design system
   */
  buildCarousel() {
    this._ds.initCarousel();
  }

}
