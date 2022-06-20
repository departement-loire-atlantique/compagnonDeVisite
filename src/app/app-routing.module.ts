import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'themes',
    loadChildren: () => import('./pages/parcours-themes/parcours-themes.module').then(m => m.ParcoursThemesModule)
  },
  {
    path: 'themes/:id',
    loadChildren: () => import('./pages/parcours-themes/thematique/thematique.module').then(m => m.ThematiqueModule)
  },
  {
    path: 'parcours/:id',
    loadChildren: () => import('./pages/parcours-themes/parcours/parcours.module').then(m => m.ParcoursModule)
  },
  {
    path: 'oeuvre/:index/:id',
    loadChildren: () => import('./pages/oeuvre/oeuvre.module').then(m => m.OeuvreModule)
  },
  {
    path: 'error',
    loadChildren: () => import('./pages/errors/errors.module').then(m => m.ErrorsModule)
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
