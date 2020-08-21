import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OpenchatPageRoutingModule } from './openchat-routing.module';

import { OpenchatPage } from './openchat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OpenchatPageRoutingModule
  ],
  declarations: [OpenchatPage]
})
export class OpenchatPageModule {}
