import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-parcours',
  templateUrl: './header-parcours.component.html',
  styleUrls: ['./header-parcours.component.scss']
})
export class HeaderParcoursComponent {

  @Input()
  imagePlan:string | null = "";

  @Input()
  customProcess:boolean = false;

  @Input()
  returnUrl:string | undefined;

  constructor(private router: Router ) {
    if(this.imagePlan == "") {
      this.imagePlan = localStorage.getItem("map");
    }
  }

  returnCustom($event: string) {
    this.router.navigate([this.returnUrl]);
  }

}
