import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DescriptionPagePage } from './description-page.page';

const routes: Routes = [
  {
    path: '',
    component: DescriptionPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DescriptionPagePageRoutingModule {}
