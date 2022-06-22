import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

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
  customProcess = false;

  constructor( private router: Router ) { }

  returnCustom($event: string) {
    this.router.navigate([this.returnUrl]);
  }

}
