import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostfoundPageRoutingModule } from './postfound-routing.module';

import { PostfoundPage } from './postfound.page';
import { MediaCapture } from '@ionic-native/media-capture/ngx';

import { Geolocation } from '@ionic-native/geolocation/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    PostfoundPageRoutingModule
  ],
  declarations: [PostfoundPage],
  providers: [Geolocation, MediaCapture]
})
export class PostfoundPageModule {}
