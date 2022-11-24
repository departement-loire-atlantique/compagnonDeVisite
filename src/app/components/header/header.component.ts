import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Input()
  urlFavoris: string | undefined;

  @Input()
  customProcess:boolean = false;

  @Input()
  returnUrl:string | undefined;

  @Input()
  labelBtn: string = $localize`:@@BackComp-text:Retour` ;

  @Input()
  hoverBtn!: string | undefined;

  constructor(private router: Router ) { }

  returnCustom($event: string) {
    this.router.navigate([this.returnUrl]);
  }

  getLabelBtn() {
    return this.labelBtn;
  }

  getHoverBtn() {
    return this.hoverBtn ? this.hoverBtn : this.labelBtn;
  }

}
