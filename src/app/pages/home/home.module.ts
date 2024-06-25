import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { HeaderComponent } from 'src/app/componentes/header/header.component';
import { TabsComponent } from 'src/app/componentes/tabs/tabs.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ], 
  declarations: [
      HomePage,
      HeaderComponent,
      TabsComponent
    ]
})
export class HomePageModule {}
