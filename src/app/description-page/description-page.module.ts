import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DescriptionPagePageRoutingModule } from './description-page-routing.module';

import { DescriptionPagePage } from './description-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DescriptionPagePageRoutingModule
  ],
  declarations: [DescriptionPagePage]
})
export class DescriptionPagePageModule {}
