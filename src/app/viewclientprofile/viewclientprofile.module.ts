import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewclientprofilePageRoutingModule } from './viewclientprofile-routing.module';

import { ViewclientprofilePage } from './viewclientprofile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewclientprofilePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ViewclientprofilePage]
})
export class ViewclientprofilePageModule {}
