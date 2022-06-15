import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParcoursThemesComponent } from './parcours-themes.component';

const routes: Routes = [{ path: '', component: ParcoursThemesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParcoursThemesRoutingModule { }
