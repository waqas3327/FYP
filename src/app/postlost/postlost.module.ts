import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostlostPageRoutingModule } from './postlost-routing.module';
import { MediaCapture } from '@ionic-native/media-capture/ngx';

import { PostlostPage } from './postlost.page';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    PostlostPageRoutingModule
  ],
  declarations: [PostlostPage],
  providers: [Geolocation, MediaCapture]
})
export class PostlostPageModule {}
