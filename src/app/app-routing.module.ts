import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AppComponent} from "./app.component";

const routes: Routes = [
    {path: '', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)},
    {path: 'men', loadChildren: () => import('./modules/men/men.module').then((m) => m.MenModule)}
  ]
;

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
