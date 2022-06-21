import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OeuvreRoutingModule } from './oeuvre-routing.module';
import { OeuvreComponent } from './oeuvre.component';
import { SharedModule } from 'src/app/components/shared.module';


@NgModule({
  declarations: [
    OeuvreComponent
  ],
  imports: [
    CommonModule,
    OeuvreRoutingModule,
    SharedModule
  ]
})
export class OeuvreModule { }
