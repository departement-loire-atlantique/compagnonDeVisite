import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParcoursThemesRoutingModule } from './parcours-themes-routing.module';
import { ParcoursThemesComponent } from './parcours-themes.component';
import { SharedModule } from 'src/app/components/shared.module';


@NgModule({
  declarations: [
    ParcoursThemesComponent
  ],
  imports: [
    CommonModule,
    ParcoursThemesRoutingModule,
    SharedModule
  ]
})
export class ParcoursThemesModule { }
