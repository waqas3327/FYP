import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewclientprofilePage } from './viewclientprofile.page';

const routes: Routes = [
  {
    path: '',
    component: ViewclientprofilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewclientprofilePageRoutingModule {}
