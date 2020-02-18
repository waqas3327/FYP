import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostlostPage } from './postlost.page';

const routes: Routes = [
  {
    path: '',
    component: PostlostPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostlostPageRoutingModule {}
