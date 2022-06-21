import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JAngularService, JcmsInterceptor } from 'j-angular';
import { OeuvreComponent } from './pages/explore/oeuvre/oeuvre.component';
import { CarrouselComponent } from './components/carrousel/carrousel.component';
import { LecteurAudioComponent } from './components/lecteur-audio/lecteur-audio.component';
import { ExploreComponent } from './pages/explore/explore/explore.component';

@NgModule({
  declarations: [
    AppComponent,
    OeuvreComponent,
    CarrouselComponent,
    LecteurAudioComponent,
    ExploreComponent,
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
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(private _jcms: JAngularService) {
    this._jcms.url = environment.jcms;
  }

}
