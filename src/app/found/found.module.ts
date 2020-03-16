import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FoundPageRoutingModule } from './found-routing.module';

import { FoundPage } from './found.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FoundPageRoutingModule
  ],
  declarations: [FoundPage]
})
export class FoundPageModule {}
