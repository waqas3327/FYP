import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostlostPageRoutingModule } from './postlost-routing.module';

import { PostlostPage } from './postlost.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostlostPageRoutingModule
  ],
  declarations: [PostlostPage]
})
export class PostlostPageModule {}
