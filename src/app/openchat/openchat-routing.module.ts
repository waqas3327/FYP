import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OpenchatPage } from './openchat.page';

const routes: Routes = [
  {
    path: '',
    component: OpenchatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OpenchatPageRoutingModule {}
