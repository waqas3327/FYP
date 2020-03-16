import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CanActivate, Router } from '@angular/router';
import { GuardService } from './sdk/custom/guard.service';
const routes: Routes = [
  {  path: '',
     redirectTo: 'geolocation',
     pathMatch: 'full'
  },
  { path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'geolocation',
    loadChildren: () => import('./geolocation/geolocation.module').then( m => m.GeolocationPageModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./about/about.module').then( m => m.AboutPageModule),
    canActivate: [GuardService]
  },
  {
    path: 'forgotpassword',
    loadChildren: () => import('./forgotpassword/forgotpassword.module').then( m => m.ForgotpasswordPageModule)
  },
  {
    path: 'postlost',
    loadChildren: () => import('./postlost/postlost.module').then( m => m.PostlostPageModule)
  },
  {
    path: 'postfound',
    loadChildren: () => import('./postfound/postfound.module').then( m => m.PostfoundPageModule)
  },  {
    path: 'description-page',
    loadChildren: () => import('./description-page/description-page.module').then( m => m.DescriptionPagePageModule)
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
