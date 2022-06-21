import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThematiqueRoutingModule } from './thematique-routing.module';
import { ThematiqueComponent } from './thematique.component';
import { SharedModule } from 'src/app/components/shared.module';


@NgModule({
  declarations: [
    ThematiqueComponent
  ],
  imports: [
    CommonModule,
    ThematiqueRoutingModule,
    SharedModule
  ]
})
export class ThematiqueModule { }
