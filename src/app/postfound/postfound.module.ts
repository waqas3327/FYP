import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostfoundPageRoutingModule } from './postfound-routing.module';

import { PostfoundPage } from './postfound.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostfoundPageRoutingModule
  ],
  declarations: [PostfoundPage]
})
export class PostfoundPageModule {}
