import { Component, OnInit } from '@angular/core';
import { Tuile } from 'src/app/components/tuile-v/tuile-v.component';

@Component({
  selector: 'app-parcours-fin',
  templateUrl: './parcours-fin.component.html',
  styleUrls: ['./parcours-fin.component.scss']
})
export class ParcoursFinComponent implements OnInit {

  tuile:Tuile | undefined;
  map: string | null = "";

  constructor() { }

  ngOnInit(): void {
    this.map = localStorage.getItem("map");
    localStorage.clear();

    this.tuile = {
      img: "http://localhost:8080/GPLA/upload/docs/image/jpeg/2022-06/7726398754_5154e64eb7_b.jpg",
      champs: [{lbl:"Ajouter la liste des oeuvres à mes favoris", icon:"icon-star-empty"}]
    }
  }

  public getHome() {
    return 'themes';
  }

}
