import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MypostsPageRoutingModule } from './myposts-routing.module';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { MypostsPage } from './myposts.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MypostsPageRoutingModule
  ],
  declarations: [MypostsPage],
  providers: [Geolocation]
})
export class MypostsPageModule {}
