import { NgModule } from '@angular/core';
import * as Hammer from 'hammerjs';
import { BrowserModule, HammerGestureConfig, HammerModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
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

export class MyHammerConfig extends HammerGestureConfig {
  override overrides = <any>{
    pan: { direction: Hammer.DIRECTION_ALL },
    pinch: {enable: true},
  };
}

@NgModule({
  declarations: [
    AppComponent,
    OeuvreComponent,
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
    FormsModule,
    SharedModule,
    HammerModule
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
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(private _jcms: JAngularService) {
    this._jcms.url = environment.jcms;
  }

}
