import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FoundPage } from './found.page';

const routes: Routes = [
  {
    path: '',
    component: FoundPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FoundPageRoutingModule {}
