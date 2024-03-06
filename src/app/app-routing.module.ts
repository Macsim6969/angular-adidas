import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "./services/auth.guard";

const routes: Routes = [
  {path: '', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)},
  {path: 'men', loadChildren: () => import('./modules/men/men.module').then((m) => m.MenModule)},
  {
    path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then((m) => m.AuthModule)
  },
  {
    path: 'favourites',
    loadChildren: () => import('./modules/favourites/favourites.module').then((m) => m.FavouritesModule),
    canActivate: [AuthGuard]
  },
  {path: 'bags', loadChildren: () => import('./modules/bags/bags.module').then((m) => m.BagsModule), canActivate: [AuthGuard]}];

@NgModule({
  imports: [RouterModule.forRoot(routes)], exports: [RouterModule]
})
export class AppRoutingModule {
}
