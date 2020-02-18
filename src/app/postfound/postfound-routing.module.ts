import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostfoundPage } from './postfound.page';

const routes: Routes = [
  {
    path: '',
    component: PostfoundPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostfoundPageRoutingModule {}
