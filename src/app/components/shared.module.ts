import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BackComponent } from './back/back.component';
import { CollapserComponent } from './collapser/collapser.component';
import { ListComponent } from './list/list.component';
import { ListBGComponent } from './list-bg/list-bg.component';
import { TuileHComponent } from './tuile-h/tuile-h.component';
import { TuileVComponent } from './tuile-v/tuile-v.component';
import { ImageTextComponent } from './image-text/image-text.component';
import { HeaderComponent } from './header/header.component';
import { HeaderGpComponent } from './header-gp/header-gp.component';
import { MenuComponent } from './menu/menu.component';
import { OverlayTutoComponent } from './overlay-tuto/overlay-tuto.component';
import { HeaderParcoursComponent } from './header-parcours/header-parcours.component';
import { EtapesComponent } from './etapes/etapes.component';
import { OverlayMapComponent } from './overlay-map/overlay-map.component';
import { CarrouselComponent } from './carrousel/carrousel.component';
import { LecteurAudioComponent } from './lecteur-audio/lecteur-audio.component';
import { LoaderComponent } from './loader/loader.component';
import { HeaderExploreComponent } from './header-explore/header-explore.component';

@NgModule({
  declarations: [
    BackComponent,
    CarrouselComponent,
    CollapserComponent,
    LecteurAudioComponent,
    ListComponent,
    ListBGComponent,
    LoaderComponent,
    TuileHComponent,
    TuileVComponent,
    ImageTextComponent,
    HeaderComponent,
    HeaderExploreComponent,
    HeaderGpComponent,
    OverlayTutoComponent,
    MenuComponent,
    HeaderParcoursComponent,
    EtapesComponent,
    OverlayMapComponent,
    HeaderExploreComponent
  ],
  imports: [CommonModule, RouterModule],
  exports: [
    BackComponent,
    CarrouselComponent,
    CollapserComponent,
    LecteurAudioComponent,
    ListComponent,
    ListBGComponent,
    LoaderComponent,
    TuileHComponent,
    TuileVComponent,
    ImageTextComponent,
    HeaderComponent,
    HeaderExploreComponent,
    HeaderGpComponent,
    OverlayTutoComponent,
    MenuComponent,
    HeaderParcoursComponent,
    EtapesComponent,
    OverlayMapComponent
  ],
})
export class SharedModule {}
