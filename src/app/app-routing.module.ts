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
    loadChildren: () => import('./postlost/postlost.module').then( m => m.PostlostPageModule),
    canActivate: [GuardService]
  },
  {
    path: 'postfound',
    loadChildren: () => import('./postfound/postfound.module').then( m => m.PostfoundPageModule),
    canActivate: [GuardService]
  },
  {
    path: 'lost',
    loadChildren: () => import('./lost/lost.module').then( m => m.LostPageModule),
    canActivate: [GuardService]
  },
  {
    path: 'found',
    loadChildren: () => import('./found/found.module').then( m => m.FoundPageModule),
    canActivate: [GuardService]
  },  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  }




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
