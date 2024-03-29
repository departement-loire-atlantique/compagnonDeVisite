import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExploreAllComponent } from './pages/parcours-explore/explore-all/explore-all.component';
import { ExploreComponent } from './pages/parcours-explore/explore/explore.component';
import { OeuvreComponent } from './pages/parcours-explore/oeuvre/oeuvre.component';
import { PlanPDFComponent } from './pages/menu/plan-pdf/plan-pdf.component';
import { AideComponent } from './pages/menu/aide/aide.component';
import { CreditsComponent } from './pages/menu/credits/credits.component';
import { InfosComponent } from './pages/menu/infos/infos.component';
import { ContactsComponent } from './pages/menu/contacts/contacts.component';

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
    path: 'parcours-fin/:id',
    loadChildren: () => import('./pages/parcours-themes/parcours-fin/parcours-fin.module').then(m => m.ParcoursFinModule)
  },
  {
    path: 'oeuvre/:index/:id',
    loadChildren: () => import('./pages/parcours-themes/oeuvre/oeuvre.module').then(m => m.OeuvreModule)
  },
  {
    path: 'error',
    loadChildren: () => import('./pages/errors/errors.module').then(m => m.ErrorsModule)
  },
  {
    path: 'planPDF', component: PlanPDFComponent
  },
  {
    path: 'aide', component: AideComponent
  },
  {
    path: 'credits', component: CreditsComponent
  },
  {
    path: 'infos', component: InfosComponent
  },
  {
    path: 'contacts', component: ContactsComponent
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
    path: 'explore-all', component: ExploreAllComponent
  },
  {
    path: '**',
    redirectTo: 'error/404'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
