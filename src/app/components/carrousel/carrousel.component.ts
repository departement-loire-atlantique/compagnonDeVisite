import { AfterViewInit, Component, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { JAngularService } from 'j-angular';
import { Carousel, CarouselElement } from 'src/app/models/jcms/carousel';
import { DesignSystemService } from 'src/app/services/design-system.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-carrousel',
  templateUrl: './carrousel.component.html',
  styleUrls: ['./carrousel.component.scss']
})
export class CarrouselComponent implements OnInit, AfterViewInit{
  @Input() carousel: Carousel | undefined;

  @Input() id: string | undefined;

  @Input() text: string | undefined;

  elements: (CarouselElement | undefined)[] = [];

  @ViewChildren('itemSwiper')
  itemSwiper: QueryList<any> | undefined;

  private _obsPager: MutationObserver | undefined;

  currentSlide: number = 1;

  constructor( private _ds: DesignSystemService,
               private _jcms: JAngularService ) { }

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
  getFullElement() {
    if (!this.carousel || !this.carousel.elements1) {
      return;
    }
    for (let i = 0; i < this.carousel.elements1.length; i++) {
      let item = this.carousel.elements1[i];

      // array init with empty item (for order)
      this.elements.push(undefined);

      this._jcms
        .get<CarouselElement>('data/' + item.id)
        .subscribe((res: CarouselElement) => {
          // TODO service fix img link
          res.imageMobile = environment.jcms + res.imageMobile;
          this.elements[i] = res;
        });
    }
  }

  ngAfterViewInit(): void {
    this.itemSwiper?.changes.subscribe((_) => {
      this.buildCarousel();
    });
  }

  buildCarousel() {
    this._ds.initCarousel();
  }

}
