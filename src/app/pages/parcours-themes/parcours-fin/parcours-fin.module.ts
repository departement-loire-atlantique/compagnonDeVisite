import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParcoursFinRoutingModule } from './parcours-fin-routing.module';
import { ParcoursFinComponent } from './parcours-fin.component';
import { SharedModule } from 'src/app/components/shared.module';


@NgModule({
  declarations: [
    ParcoursFinComponent
  ],
  imports: [
    CommonModule,
    ParcoursFinRoutingModule,
    SharedModule
  ]
})
export class ParcoursFinModule { }
