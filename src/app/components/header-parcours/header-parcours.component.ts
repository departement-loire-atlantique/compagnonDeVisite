import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-parcours',
  templateUrl: './header-parcours.component.html',
  styleUrls: ['./header-parcours.component.scss']
})
export class HeaderParcoursComponent {

  @Input()
  imagePlan:string | undefined;

  @Input()
  customProcess:boolean = false;

  @Input()
  returnUrl:string | undefined;

  @Input()
  popUp:boolean = false;

  constructor(private router: Router ) {
    // if(this.imagePlan == "") {
    //   let plan = localStorage.getItem("map");
    //   if(plan)
    //     this.imagePlan = plan;
    // }
  }

  returnCustom($event: string) {
    this.router.navigate([this.returnUrl]);
  }

}
