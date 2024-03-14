import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JAngularService, JcmsInterceptor } from 'j-angular';
import { OeuvreComponent } from './pages/parcours-explore/oeuvre/oeuvre.component';
import { ExploreComponent } from './pages/parcours-explore/explore/explore.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './components/shared.module';
import { ExploreAllComponent } from './pages/parcours-explore/explore-all/explore-all.component';
import { PlanPDFComponent } from './pages/menu/plan-pdf/plan-pdf.component';
import { AideComponent } from './pages/menu/aide/aide.component';

@NgModule({
  declarations: [
    AppComponent,
    OeuvreComponent,
    ExploreComponent,
    ExploreAllComponent,
    PlanPDFComponent,
    AideComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    FormsModule,
    SharedModule,
  ],
  providers: [
    JcmsInterceptor,
    {
      provide: HTTP_INTERCEPTORS,
      useFactory: (interceptor: JcmsInterceptor) => {
        interceptor.token = environment.token;
        return interceptor;
      },
      deps: [JcmsInterceptor],
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(private _jcms: JAngularService) {
    this._jcms.url = environment.jcms;
  }

}
