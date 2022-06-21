import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExploreComponent } from './pages/parcours-explore/explore/explore.component';
import { OeuvreComponent } from './pages/parcours-explore/oeuvre/oeuvre.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'error',
    loadChildren: () => import('./pages/errors/errors.module').then(m => m.ErrorsModule)
  },
  {
    path: 'explore/oeuvre/:id', component: OeuvreComponent
  },
  {
    path: 'explore/:text', component: ExploreComponent
  },
  {
    path: 'explore', component: ExploreComponent
  },
  {
    path: '**',
    redirectTo: 'error/404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
