import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// import { AlertComponent } from 'src/app/components/alert/alert.component';
import { BackComponent } from './back/back.component';
import { CollapserComponent } from './collapser/collapser.component';
// import { ContactDetailsComponent } from '@/app/components/contact/contact-details/contact-details.component';
// import { ContactComponent } from '@/app/components/contact/contact.component';
// import { CarouselComponent } from '@/app/components/contents/carousel/carousel.component';
// import { VideoComponent } from '@/app/components/contents/video/video.component';
// import { HasHelpedComponent } from '@/app/components/has-helped/has-helped.component';
// import { HeadingComponent } from '@/app/components/heading/heading.component';
// import { IconComponent } from '@/app/components/icon/icon.component';
// import { LoaderComponent } from '@/app/components/loader/loader.component';
// import { MainMenuComponent } from '@/app/components/main-menu/main-menu.component';
// import { NextLinkComponent } from '@/app/components/next-link/next-link.component';
// import { PageTitleComponent } from '@/app/components/page-title/page-title.component';
// import { PageTitleCustomComponent } from '@/app/components/page-title-custom/page-title-custom.component';
// import { PaginationComponent } from '@/app/components/pagination/pagination.component';
// import { ThemeHeaderComponent } from '@/app/components/theme-header/theme-header.component';

// import { HiddenTextComponent } from './hidden-text/hidden-text.component';
// import { ResearchBtnComponent } from './research-btn/research-btn.component';

import { ListComponent } from './list/list.component';
import { ListBGComponent } from './list-bg/list-bg.component';
import { TuileHComponent } from './tuile-h/tuile-h.component';
import { TuileVComponent } from './tuile-v/tuile-v.component';
import { ImageTextComponent } from './image-text/image-text.component';
import { MenuComponent } from './menu/menu.component';
import { MenuGpComponent } from './menu-gp/menu-gp.component';

@NgModule({
  declarations: [
    // MainMenuComponent,
    // LoaderComponent,
    // PageTitleComponent,
    // PageTitleCustomComponent,
    BackComponent,
    // ThemeHeaderComponent,
    // HasHelpedComponent,
    // CarouselComponent,
    // VideoComponent,
    CollapserComponent,
    // AlertComponent,
    // HiddenTextComponent,
    ListComponent,
    ListBGComponent,
    TuileHComponent,
    TuileVComponent,
    ImageTextComponent,
    MenuComponent,
    MenuGpComponent,
    // PaginationComponent,
    // HeadingComponent,
    // ContactComponent,
    // ContactDetailsComponent,
    // ResearchBtnComponent,
    // IconComponent,
    // NextLinkComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [
    // MainMenuComponent,
    // LoaderComponent,
    // PageTitleComponent,
    // PageTitleCustomComponent,
    BackComponent,
    // ThemeHeaderComponent,
    // HasHelpedComponent,
    // CarouselComponent,
    // VideoComponent,
    CollapserComponent,
    // AlertComponent,
    ListComponent,
    ListBGComponent,
    TuileHComponent,
    TuileVComponent,
    ImageTextComponent,
    MenuComponent,
    MenuGpComponent,
    // HiddenTextComponent,
    // PaginationComponent,
    // ContactComponent,
    // HeadingComponent,
    // ContactDetailsComponent,
    // ResearchBtnComponent,
    // IconComponent,
    // NextLinkComponent,
  ],
})
export class SharedModule {}
