import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';

//importar componentes
import { HomeComponent } from './pages/home/home.component';
import { CoinsComponent } from './pages/coins/coins.component';

export const routes: Routes = [
    {path:'',redirectTo:'/home',pathMatch:'full'},
    {path:'home', component:HomeComponent},
    {path:'monedas', component:CoinsComponent},
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
