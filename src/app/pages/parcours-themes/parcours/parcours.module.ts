import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParcoursRoutingModule } from './parcours-routing.module';
import { ParcoursComponent } from './parcours.component';
import { SharedModule } from 'src/app/components/shared.module';


@NgModule({
  declarations: [
    ParcoursComponent
  ],
  imports: [
    CommonModule,
    ParcoursRoutingModule,
    SharedModule
  ]
})
export class ParcoursModule { }
