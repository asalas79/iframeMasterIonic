import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage-angular';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './interceptors/interceptor.service';


@NgModule({
  declarations: [AppComponent],
  imports: [
      BrowserModule,
      IonicModule.forRoot(),
      AppRoutingModule,
      IonicStorageModule.forRoot()      
    ],
  providers: [
      provideHttpClient(
        withInterceptors([authInterceptor])
      ),
      { 
        provide: RouteReuseStrategy,
        useClass: IonicRouteStrategy        
      }
    ],
  bootstrap: [AppComponent],
})
export class AppModule {}
