import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';

//importar componentes
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    {path:'',redirectTo:'/home',pathMatch:'full'},
    {path:'home', component:HomeComponent},
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
