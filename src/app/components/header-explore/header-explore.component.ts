import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-explore',
  templateUrl: './header-explore.component.html',
  styleUrls: ['./header-explore.component.scss']
})
export class HeaderExploreComponent {

  @Input()
  imagePlan:string | undefined;

  @Input()
  returnUrl:string | undefined;

  @Input()
  labelBtn: string = $localize`:@@BackComp-text:Retour` ;

  @Input()
  hoverBtn!: string | undefined;

  @Input()
  customProcess = false;

  constructor( private router: Router ) { }

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
