import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ThematiqueComponent } from './thematique.component';


const routes: Routes = [{ path: '', component: ThematiqueComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThematiqueRoutingModule { }
