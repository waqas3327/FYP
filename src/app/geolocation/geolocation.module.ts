import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GeolocationPageRoutingModule } from './geolocation-routing.module';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { GeolocationPage } from './geolocation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GeolocationPageRoutingModule
  ],
  declarations: [GeolocationPage],
  providers: [Geolocation]
})
export class GeolocationPageModule {}
