import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParcoursFinComponent } from './parcours-fin.component';

const routes: Routes = [{ path: '', component: ParcoursFinComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParcoursFinRoutingModule { }
