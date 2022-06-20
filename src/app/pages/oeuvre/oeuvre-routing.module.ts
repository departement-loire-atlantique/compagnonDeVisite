import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OeuvreComponent } from './oeuvre.component';

const routes: Routes = [{ path: '', component: OeuvreComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OeuvreRoutingModule { }
